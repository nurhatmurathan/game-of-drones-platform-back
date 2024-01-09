import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(email: string, code: string) {
        await this.mailerService.sendMail({
            to: email,
            from: process.env.GOOGLE_MAIL_SENDER,
            subject: "Welcome to Game Of Drones! Confirm your Email",
            template: "confirmation",
            context: { code },
        });
    }
}
