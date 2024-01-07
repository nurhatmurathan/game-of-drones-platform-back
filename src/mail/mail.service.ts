import { Token } from "../entities/token/token.entity";
import { User } from "./../entities/user/user.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(email: string, code: string) {
        await this.mailerService.sendMail({
            to: email,
            from: "jasawweb@gmail.com",
            subject: "Welcome to Game Of Drones! Confirm your Email",
            template: "confirmation",
            context: { code },
        });
    }
}
