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
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`${process.env.MONGODB_URL}`),
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        auth: {
          type: 'OAuth2',
          user: 'xuanngochq2k@gmail.com',
          clientId:
            '502517293767-5r4ut28qecrla1h94mfhdb2t8p3qim0h.apps.googleusercontent.com',
          clientSecret: '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',
          refreshToken:
            '1//04cEXx-WcZ0wNCgYIARAAGAQSNwF-L9IrxuQRrycrh8kARIp_qOGPRFyBKqiM_E17qQGdovPoBw2sgSEMKlLjoArC8gCVgXh8w68',
          accessToken:
            'ya29.a0ARrdaM9FEGeSgyq6-sRifdx5jRi3tSANfJyjztUFeZ549rVLEItdQBmLcw6XYfkozlDBGkP7gU5FK4tj0S6qbjrL776Ppi1CrA6KZ3W3kmVNZ51kJRaGja3NIMd86PPDFfiV842FZYe0GBlyfRVNvqTLEsEa',
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
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
  exports: [AppService],
})
export class AppModule {}
