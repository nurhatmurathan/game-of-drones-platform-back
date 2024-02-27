import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CustomAuthGuard } from '../../src/auth/guards';
import { AppModule } from "./../../src/app.module";

describe('TournamentController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
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



    it('/tournament/:id (GET)', async () => {
        const id = 1; // Assuming this ID exists in your database
        return request(app.getHttpServer())
            .get(`/tournament/${id}`)
            .expect(HttpStatus.OK)
            .expect('Content-Type', /json/);
    });

    it('/tournament (GET)', async () => {
        return request(app.getHttpServer())
            .get('/tournament')
            .expect(HttpStatus.OK)
            .expect('Content-Type', /json/);
    });

});
