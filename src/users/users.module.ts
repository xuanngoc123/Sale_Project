import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailsModule } from 'src/mails/mails.module';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UserSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MailsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
