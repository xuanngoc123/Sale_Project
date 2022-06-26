import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ExInternalServerError } from '../swagger/value-example';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ObjectID } from '../commons/commons.type';
import { ROLE_ENUM } from './users.constant';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';
@ApiTags('User')
@ApiInternalServerErrorResponse({
  description: 'Internal Server Error',
  type: ExInternalServerError,
})
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.register(createUserDto);
  }

  @Put('verify')
  vefifyEmail(@Query('token') token: string) {
    return this.userService.vefifyEmail(token);
  }

  @Roles(ROLE_ENUM.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  deleteUser(@Query('id') id: ObjectID, @Req() req: Request) {
    return this.userService.deleteUser(id);
  }
}
