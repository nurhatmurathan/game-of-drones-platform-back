import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from "supertest";
import { AppModule } from "../../src/app.module";
import { CustomAuthGuard } from '../../src/auth/guards';

describe('RouteController (e2e)', () => {
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


    it('/route (GET)', async () => {
        return request(app.getHttpServer())
            .get('/route')
            .expect(HttpStatus.ACCEPTED)
            .set('Accept-Language', 'en')
            .then((res) => {
                expect(Array.isArray(res.body)).toBe(true);
            });
    });

    it('/route/:id (GET)', async () => {
        const testId = 1;
        return request(app.getHttpServer())
            .get(`/route/${testId}`)
            .set('Accept-Language', 'en')
            .expect(HttpStatus.ACCEPTED)
            .then((res) => {
                expect(res.body.id).toEqual(testId);
            });
    });


});
