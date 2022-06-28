import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  @Post('login')
  @ApiBody({ description: 'Enter email and password', type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  login(@Req() req): any {
    return req.user;
  }
}
