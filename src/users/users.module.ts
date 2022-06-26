import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from 'src/mail/mail.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UserSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, MailService],
  exports: [UserRepository],
})
export class UsersModule {}
