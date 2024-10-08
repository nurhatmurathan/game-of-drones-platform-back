import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "./../entities/user/user.entity";

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

        return { message: "Code is sended to your email" };
    }

    async sendUserPasswordResetLink(
        user: User,
        token: string,
        language: string
    ) {
        const link: string = `${process.env.PASSWORDRESET_HOST}/${language}/auth/confirm-reset?token=${token}`;

        await this.mailerService.sendMail({
            to: user.email,
            from: process.env.GOOGLE_MAIL_SENDER,
            subject: `Reset Your Password for ${user.firstName} ${user.lastName}`,
            template: `passwordreset${language}`,
            context: { link },
        });

        return { message: "Link to reset password is sended to your email" };
    }
}
