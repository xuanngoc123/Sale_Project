import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategorysModule } from './categorys/categorys.module';
import { ItemsModule } from './items/items.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { FlashSalesModule } from './flash-sales/flash-sales.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`${process.env.MONGODB_URL}`),
    UsersModule,
    AuthModule,
    CategorysModule,
    ItemsModule,
    VouchersModule,
    FlashSalesModule,
    OrdersModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
