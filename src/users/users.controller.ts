import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { ExInternalServerError } from '../swagger/value-example';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ObjectID } from '../commons/commons.type';
import { ROLE_ENUM } from './users.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { IUser } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { EmailDto } from '../auth/auth.dto';
@ApiTags('User')
@ApiInternalServerErrorResponse({
  description: 'Internal Server Error',
  type: ExInternalServerError,
})
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.register(createUserDto);
  }

  @Put('verify')
  verifyEmail(@Query('token') token: string): Promise<IUser> {
    return this.userService.verifyEmail(token);
  }

  @Roles(ROLE_ENUM.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('info')
  updateInfo(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.userService.updateInfo(updateUserDto, req);
  }

  @Post('resend-email')
  resendLinkActive(@Body() email: EmailDto) {
    return this.userService.resendEmail(email.email);
  }

  @Roles(ROLE_ENUM.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Query('id') id: ObjectID): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
