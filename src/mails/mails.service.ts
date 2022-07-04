import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: any, html: string, subject: string) {
    await this.mailerService.sendMail({
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: subject,
      html: html,
    });
  }
}
