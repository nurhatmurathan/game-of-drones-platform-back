import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "./../../src/app.module";

describe("UserController (e2e)", () => {
    let app: INestApplication;
    let jwtToken: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it("/auth/login (POST)", async () => {
        const response = await request(app.getHttpServer())
            .post("/auth/login")
            .send({
                email: "nurhatmurathan001@gmail.com",
                password: "12345678",
            })
            .expect(HttpStatus.OK);

        jwtToken = response.body.access;
        expect(jwtToken).toBeDefined();
    });

    it("/users/profile (GET)", () => {
        return request(app.getHttpServer())
            .get("/users/profile")
            .set("Authorization", `Bearer ${jwtToken}`)
            .expect(HttpStatus.OK)
            .then((response) => {
                expect(response.body).toEqual({
                    firstName: "Muratkan",
                    lastName: "Nurkhat",
                    avatar: null,
                    email: "nurhatmurathan001@gmail.com",
                });
            });
    });
});
