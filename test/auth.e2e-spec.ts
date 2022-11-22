import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../src/auth/auth.constants';
import { loginDto } from './config/auth.config';

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) -- success', async () => {
		return await request(app.getHttpServer())
			.post('/auth/login/')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it('/auth/login (POST) -- fail password', () => {
		return request(app.getHttpServer())
			.post('/auth/login/')
			.send({ ...loginDto, password: '777' })
			.expect(401, {
				statusCode: 401,
				message: WRONG_PASSWORD_ERROR,
				error: 'Unauthorized',
			});
	});

	it('/auth/login (POST) -- fail login', () => {
		return request(app.getHttpServer())
			.post('/auth/login/')
			.send({ ...loginDto, login: 'b@b.ru' })
			.expect(401, {
				statusCode: 401,
				message: USER_NOT_FOUND_ERROR,
				error: 'Unauthorized',
			});
	});

	afterAll(() => disconnect());
});

