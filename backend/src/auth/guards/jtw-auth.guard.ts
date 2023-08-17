import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'; // Import error types

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }

      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException({
          message: 'Token has expired',
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      } else if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException({
          message: 'Invalid token',
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }

      throw new UnauthorizedException({
        message: 'User is not authorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
  }
}
