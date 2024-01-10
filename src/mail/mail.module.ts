import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import * as dotenv from "dotenv";
import { join } from "path";
import { MailService } from "./mail.service";
dotenv.config();
@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: "smtp.gmail.com",
                secure: false,
                auth: {
                    user: process.env.GOOGLE_MAIL_SENDER,
                    pass: process.env.GOOGLE_MAIL_SENDER_PASS,
                },
            },
            defaults: {
                from: "jasawweb@gmail.com",
            },
            template: {
                dir: join(process.cwd(), "dist", "mail", "templates"),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}

console.log(process.env.GOOGLE_MAIL_SENDER);
