import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  UnauthorizedResponse,
} from '../swagger/value-example';
import { LoginDto } from './dto/auth.dto';
import { LoginAccessDto } from './dto/swagger.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  @ApiOkResponse({ type: LoginAccessDto, description: 'Login success' })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
    description: 'Email not found / Password invalid',
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({
    type: ForbiddenResponse,
    description: 'Account not actived / Account ban',
  })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse })
  @Post('login')
  @ApiBody({ description: 'Enter email and password', type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  login(@Req() req): LoginAccessDto {
    return req.user;
  }
}
