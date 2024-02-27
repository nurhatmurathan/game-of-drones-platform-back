import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from "supertest";
import { AppModule } from "../../src/app.module";
import { CustomAuthGuard, IsAdminGuard } from '../../src/auth/guards';

describe('TournamentAdminController (e2e)', () => {
    let app: INestApplication;
    let testId: number;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(CustomAuthGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(IsAdminGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/admin-tournament (GET)', async () => {
        return request(app.getHttpServer())
            .get('/admin-tournament')
            .expect(HttpStatus.ACCEPTED)
            .then((res) => {
                expect(Array.isArray(res.body)).toBe(true);
            });
    });

    it('/admin-tournament (POST)', async () => {
        const createDto = {
            name: 'Test Tournament',
            description:
            {
                kz: "Test Description",
                ru: "Test Description",
                en: "Test Description"
            },
            coverDescription:
            {
                kz: "Test Cover Description",
                ru: "Test Cover Description",
                en: "Test Cover Description"
            },
            startDate: Date.now(),
            price: 100,
            routeId: 1, // Ensure this ID exists in your test environment
            tournamentTimes: [],
        };

        const response = await request(app.getHttpServer())
            .post('/admin-tournament')
            .send(createDto)
            .expect(HttpStatus.CREATED)
            .expect((res) => {
                expect(res.body.name).toEqual(createDto.name);
            });


        testId = response.body.id
        return response;
    });

    it('/admin-tournament/:id (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/admin-tournament/${testId}`)
            .expect(HttpStatus.ACCEPTED)
            .then((res) => {
                expect(res.body.id).toEqual(testId);
            });
    });


    it('/admin-tournament/:id (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/admin-tournament/${testId}`)
            .expect(HttpStatus.NO_CONTENT);
    });

});
