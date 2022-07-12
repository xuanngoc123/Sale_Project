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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestResponse,
  ConflicResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  UnauthorizedResponse,
} from '../swagger/value-example';
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
import { EmailDto } from '../auth/dto/auth.dto';
import { CreatedUserResponse, UpdateUserResponse } from './dto/swagger.dto';
@ApiTags('User')
@ApiInternalServerErrorResponse({
  description: 'Internal Server Error',
  type: InternalServerErrorResponse,
})
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  //REGISTER-----------------------------------------------------
  @ApiCreatedResponse({ type: CreatedUserResponse })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
    description:
      'email must be an email/ password should not be empty/ userName should not be empty',
  })
  @ApiConflictResponse({ type: ConflicResponse })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.register(createUserDto);
  }

  //VERiFY EMAIL----------------------------------------------------------
  @ApiInternalServerErrorResponse({
    description: 'jwt expired/ invalid token',
    type: InternalServerErrorResponse,
  })
  @ApiOkResponse({ type: CreatedUserResponse })
  @Put('verify')
  verifyEmail(@Query('token') token: string): Promise<IUser> {
    return this.userService.verifyEmail(token);
  }

  //UPDATE INFO--------------------------------------------------------------
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({ type: UpdateUserResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @UseGuards(JwtAuthGuard)
  @Put('info')
  updateInfo(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.userService.updateInfo(updateUserDto, req);
  }

  //RESEND MAIL ACTIVE-------------------------------------------------------
  @ApiOkResponse({
    type: 'Send mail success',
    description: 'Send mail success',
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
    description: 'Account banned/ Account actived',
  })
  @ApiNotFoundResponse({
    type: NotFoundResponse,
    description: 'Email not found',
  })
  @HttpCode(HttpStatus.OK)
  @Post('resend-email')
  resendLinkActive(@Body() email: EmailDto) {
    return this.userService.resendEmail(email.email);
  }

  //DELETE USER------------------------------------------------------------
  @ApiBearerAuth('Authorization')
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiNoContentResponse({ description: 'Delete success' })
  @ApiForbiddenResponse({
    type: ForbiddenResponse,
    description: 'you are not admin',
  })
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Query('id') id: ObjectID): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
