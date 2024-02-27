import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from "../../src/app.module";
import { CustomAuthGuard } from "../../src/auth/guards";

describe('TaskController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(CustomAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/task (GET)', async () => {
        return request(app.getHttpServer())
            .get('/task')
            .set('Accept-Language', 'en')
            .expect(HttpStatus.ACCEPTED)
            .then((res) => {
                expect(Array.isArray(res.body)).toBe(true);
            });
    });

    it('/task/:id (GET)', async () => {
        const testId = 1;
        return request(app.getHttpServer())
            .get(`/task/${testId}`)
            .set('Accept-Language', 'en')
            .expect(HttpStatus.ACCEPTED)
            .then((res) => {
                expect(res.body.id).toEqual(testId);
            });
    });


});
