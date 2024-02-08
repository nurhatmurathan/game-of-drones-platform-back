import { MailerService } from "@nestjs-modules/mailer";
import { Test, TestingModule } from "@nestjs/testing";
import { User } from "./../entities/user/user.entity";
import { MailService } from "./mail.service";

describe("MailService", () => {
    let service: MailService;
    let mailerService: MailerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MailService,
                {
                    provide: MailerService,
                    useValue: {
                        sendMail: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<MailService>(MailService);
        mailerService = module.get<MailerService>(MailerService);
    });

    describe("sendUserConfirmation", () => {
        it("should send an email to the user", async () => {
            const email = "test@example.com";
            const code = "123456";

            await service.sendUserConfirmation(email, code);

            expect(mailerService.sendMail).toHaveBeenCalledWith({
                to: email,
                from: process.env.GOOGLE_MAIL_SENDER,
                subject: "Welcome to Game Of Drones! Confirm your Email",
                template: "confirmation",
                context: { code },
            });
        });
    });

    describe("sendUserPasswordResetLink", () => {
        it("should send a password reset link to the user", async () => {
            const user = new User();
            user.email = "user@example.com";
            user.firstName = "John";
            user.lastName = "Doe";

            const token = "reset_token";
            const language = "en";

            await service.sendUserPasswordResetLink(user, token, language);

            const link = `${process.env.PASSWORDRESET_HOST}/${language}/auth/confirm-reset?token=${token}`;

            expect(mailerService.sendMail).toHaveBeenCalledWith({
                to: user.email,
                from: process.env.GOOGLE_MAIL_SENDER,
                subject: `Reset Your Password for ${user.firstName} ${user.lastName}`,
                template: `passwordreset${language}`,
                context: { link },
            });
        });
    });
});
