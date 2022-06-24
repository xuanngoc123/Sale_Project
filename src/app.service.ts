import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: any, html, subject) {
    await this.mailerService.sendMail({
      to: user.email,
      from: 'xuanngochq2k@gmail.com',
      subject: subject,
      html: html,
    });
  }
}
