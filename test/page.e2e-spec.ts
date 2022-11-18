import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';
import { CreatePageDto } from 'src/page/dto/create-page.dto';
import { loginDto } from './config/auth.config';
import { FindPageDto } from '../src/page/dto/find-page.dto';
import { NOT_FOUND_PAGE_ERROR } from '../src/page/page.constants';

const testDto: CreatePageDto = {
	firstCategory: 1,
	secondCategory: 'Разработка',
	alias: `typescript-${Math.random() * 3}`,
	title: 'Курсы по TypeScript',
	category: 'typescript',
	hh: {
		count: 1000,
		juniorSalary: 120000,
		middleSalary: 220000,
		seniorSalary: 350000,
		updatedAt: new Date(),
	},
	advantages: [
		{
			title: 'Скорость разработки',
			description: 'Мое описание',
		},
	],
	seoText: 'Тест',
	tagsTitle: 'Полученные знания',
	tags: ['TypeScript'],
};

const findDto: FindPageDto = {
	firstCategory: 1,
};

const randomStringValue = 'random_value';
const randomId = new Types.ObjectId().toHexString();

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let bearer: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer()).post('/auth/login/').send(loginDto);
		bearer = 'Bearer ' + body.access_token;
	});

	it('/page/create (POST) -- success', async () => {
		return await request(app.getHttpServer())
			.post('/page/create')
			.set('Authorization', bearer)
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/page/find (POST) -- success', () => {
		return request(app.getHttpServer()).post('/page/find').send(findDto).expect(200);
	});

	it('/page/:pageId (GET) -- success', () => {
		return request(app.getHttpServer())
			.get('/page/' + createdId)
			.set('Authorization', bearer)
			.expect(200);
	});

	it('/page/:pageId (GET) -- page-not-found-fail', () => {
		return request(app.getHttpServer())
			.get('/page/' + randomId)
			.set('Authorization', bearer)
			.expect(404, {
				statusCode: 404,
				message: NOT_FOUND_PAGE_ERROR,
				error: 'Not Found',
			});
	});

	it('/page/:pageId (PATCH) -- success', async () => {
		return await request(app.getHttpServer())
			.patch('/page/' + createdId)
			.set('Authorization', bearer)
			.send({ ...testDto, title: randomStringValue })
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.title).toEqual(randomStringValue);
			});
	});

	it('/page/:pageId (DELETE) -- success', () => {
		return request(app.getHttpServer())
			.delete('/page/' + createdId)
			.set('Authorization', bearer)
			.expect(200);
	});

	afterAll(() => disconnect());
});
