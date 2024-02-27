import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from "../../src/app.module";
import { CustomAuthGuard, IsAdminGuard } from "../../src/auth/guards";

describe('RouteAdminController (e2e)', () => {
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

    it('/admin-route (GET)', async () => {
        return request(app.getHttpServer())
            .get('/admin-route')
            .expect(HttpStatus.CREATED)
            .then((res) => {
                expect(Array.isArray(res.body)).toBeTruthy();
            });
    });

    it('/admin-route (POST)', async () => {
        const createDto = {
            name: 'New Route',
            description:
            {
                en: "New Route Description",
                kz: "New Route Description",
                ru: "New Route Description"
            },
            length: '10km',
            bestTime: 3600,
            map: 'http://example.com/route/map',
        };

        const response = await request(app.getHttpServer())
            .post('/admin-route')
            .send(createDto)
            .expect(HttpStatus.OK)
            .expect((res) => {
                expect(res.body).toMatchObject(createDto);
            });

        testId = response.body.id;
        return response;
    });


    it('/admin-route/:id (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/admin-route/${testId}`)
            .expect(HttpStatus.OK)
            .then((res) => {
                expect(res.body.id).toEqual(testId);
            });
    });

    it('/admin-route/:id (PUT)', async () => {
        const updateDto = {
            name: 'Updated Route',
            description:
            {
                en: "Updated Description",
                kz: "Updated Description",
                ru: "Updated Description"
            },
            length: '15km',
            bestTime: 5400,
            map: 'http://example.com/route/updatedmap',
        };

        return request(app.getHttpServer())
            .put(`/admin-route/${testId}`)
            .send(updateDto)
            .expect(HttpStatus.OK)
            .then((res) => {
                expect(res.body.id).toEqual(testId);
                expect(res.body.name).toEqual(updateDto.name);
            });
    });

    it('/admin-route/:id (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/admin-route/${testId}`)
            .expect(HttpStatus.NO_CONTENT);
    });



});
