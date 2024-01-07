import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { join } from "path";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: "smtp.gmail.com",
                secure: false,
                auth: {
                    user: "jasawweb@gmail.com",
                    pass: "vzkykkpltrudpomx",
                },
            },
            defaults: {
                from: "jasawweb@gmail.com",
            },
            template: {
                dir: join(process.cwd(), "dist\\mail\\templates"),
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
