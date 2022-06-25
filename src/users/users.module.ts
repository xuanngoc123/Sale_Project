import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from 'src/app.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UserSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UserRepository],
})
export class UsersModule {}
