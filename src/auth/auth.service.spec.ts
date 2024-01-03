import { DatabaseModule } from "./../database/database.module";
import { UserModule } from "./../entities/user/user.module";
import { UserService } from "./../entities/user/user.service";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import * as bcrypt from "bcrypt";

describe("AuthService", () => {
    let service: AuthService;
    const testUser = {
        email: "test@gmail.com",
        iin: "123456789123",
        password: "test1234",
    };
    const testUserData = {
        id: 1,
        email: "test@gmail.com",
        iin: "123456789123",
        password:
            "$2b$10$ndc/wHM7CWbTEHd6o222qe5g560bmKYMfk0XioXU6iAXM1wClalke",
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        findOneByEmail: jest
                            .fn()
                            .mockResolvedValue(testUserData),
                        create: jest.fn().mockResolvedValue(testUserData),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn().mockResolvedValue("Token"),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("Register and SignIn", () => {
        it("should be register user than return access and refresh token", async () => {
            const tokens = await service.register(testUser);
            expect(tokens).toHaveProperty("access");
            expect(tokens).toHaveProperty("refresh");
        });
    });
});
