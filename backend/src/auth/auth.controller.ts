import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './interfaces/dtos/create-user.dto';
import { LoginUserDto } from './interfaces/dtos/login.dto';
import { UserEntity } from './repository/user.entity';

@ApiTags('Auth functional')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Registration' })
  @ApiOkResponse({ status: 200 })
  @Post('/registration')
  registration(
    @Body()
    userDto: CreateUserDto,
  ) {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ status: 200, type: UserEntity })
  @Post('/login')
  login(
    @Body()
    userDto: LoginUserDto,
  ) {
    return this.authService.login(userDto);
  }
}
