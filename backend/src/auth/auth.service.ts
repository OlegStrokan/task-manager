import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './interfaces/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './interfaces/dtos/login.dto';
import { UserEntity } from './repository/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from './interfaces/IUser';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<IUser>,
  ) {}

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userRepository.findOneBy({
      email: userDto.email,
    });
    if (candidate) {
      throw new HttpException(
        'User with this email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const user = this.userRepository.create({
      ...userDto,
      password: hashPassword,
    });

    await this.userRepository.save(user);
    await this.userRepository.find();

    return {
      message: 'Registration was successful',
    };
  }

  async login(userDto: LoginUserDto) {
    const userData = await this.validateUser(userDto);
    const { token } = await this.generateToken(userData);
    return {
      ...userData,
      token,
    };
  }

  async validateUser(userDto: LoginUserDto) {
    const user = await this.userRepository.findOneBy({ email: userDto.email });

    if (!user) {
      throw new HttpException(
        `Incorrect email or password`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new HttpException(
      `Incorrect email or password`,
      HttpStatus.UNAUTHORIZED,
    );
  }

  private async generateToken(user: IUser) {
    const payload = {
      id: user.id,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
