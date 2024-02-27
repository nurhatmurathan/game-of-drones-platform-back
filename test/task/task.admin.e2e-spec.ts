import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from "../../src/app.module";
import { CustomAuthGuard, IsAdminGuard } from "../../src/auth/guards";

describe('TaskAdminController (e2e)', () => {
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

    it('/admin-task (GET)', async () => {
        return request(app.getHttpServer())
            .get('/admin-task')
            .expect(HttpStatus.ACCEPTED)
            .then((res) => {
                expect(Array.isArray(res.body)).toBe(true);
            });
    });

    it('/admin-task (POST)', async () => {
        const createDto = {
            name: 'New Task',
            maxCount: 100,
            inOneGame: false,
            description:
            {
                en: 'New task description',
                kz: 'New task description',
                ru: 'New task description'
            },
            taskDescription: {
                en: 'New task detailed description',
                kz: 'New task detailed description',
                ru: 'New task detailed description'
            },
            reward: 'Reward for new task',
        };

        const response = await request(app.getHttpServer())
            .post('/admin-task')
            .send(createDto)
            .expect(HttpStatus.CREATED)

        expect(response.body.name).toMatchObject(createDto);

        testId = response.body.id;
        return response;
    });



    it('/admin-task/:id (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/admin-task/${testId}`)
            .expect(HttpStatus.ACCEPTED)
            .then((res) => {
                expect(res.body.id).toEqual(testId);
            });
    });

    it('/admin-task/:id (PUT)', async () => {
        const updateDto = {
            name: 'Updated Task',
            maxCount: 200,
            inOneGame: true,
            description:
            {
                en: 'Updated task description',
                kz: 'Updated task description',
                ru: 'Updated task description'
            },
            taskDescription: {
                en: 'Updated task detailed description',
                kz: 'Updated task detailed description',
                ru: 'Updated task detailed description'
            },
            reward: 'Updated reward',
        };
        return request(app.getHttpServer())
            .put(`/admin-task/${testId}`)
            .send(updateDto)
            .expect(HttpStatus.ACCEPTED)
            .then((res) => {
                expect(res.body.id).toEqual(testId);
                expect(res.body.name).toEqual(updateDto.name);
            });
    });


    it('/admin-task/:id (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/admin-task/${testId}`)
            .expect(HttpStatus.NO_CONTENT);
    });



});
