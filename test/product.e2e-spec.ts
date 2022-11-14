import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';
import { CreateProductDto } from '../src/product/dto/create-product.dto';
import { FindProductDto } from '../src/product/dto/find-product.dto';
import { PRODUCT_NOT_FOUND_ERROR } from '../src/product/product.constants';
import { ID_VALIDATION_ERROR } from '../src/pipes/id-validation.constants';
import { loginDto } from './config/auth.config';

const testDto: CreateProductDto = {
	image: '1.png',
	title: 'Мой продукт',
	price: 100,
	oldPrice: 120,
	credit: 10,
	caclulatedRating: 0,
	description: 'Описание продукта',
	advantages: 'Преимущества продукта',
	disAdvantages: 'Недостатки продукта',
	categories: ['тест'],
	tags: ['тег1'],
	characteristics: [
		{
			name: 'Харатеристика 1',
			value: '1',
		},
		{
			name: 'Харатеристика 2',
			value: '2',
		},
	],
};

const findDto: FindProductDto = {
	category: 'тест',
	limit: 5,
};

const randomNumberValue = Math.floor(Math.random() * 80);
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

	it('/product/create (POST) -- success', async () => {
		return await request(app.getHttpServer())
			.post('/product/create')
			.set('Authorization', bearer)
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/product/create (POST) -- authorized-fail', () => {
		return request(app.getHttpServer())
			.post('/product/create')
			.set('Authorization', randomStringValue)
			.send(testDto)
			.expect(401, {
				statusCode: 401,
				message: 'Unauthorized',
			});
	});

	it('/product/find (POST) -- success', () => {
		return request(app.getHttpServer()).post('/product/find').send(findDto).expect(200);
	});

	it('/product/:productId (GET) -- success', () => {
		return request(app.getHttpServer())
			.get('/product/' + createdId)
			.set('Authorization', bearer)
			.expect(200);
	});

	it('/product/:productId (GET) -- authorized-fail', () => {
		return request(app.getHttpServer())
			.get('/product/' + createdId)
			.set('Authorization', randomStringValue)
			.expect(401, {
				statusCode: 401,
				message: 'Unauthorized',
			});
	});

	it('/product/:productId (GET) -- product-not-found-fail', () => {
		return request(app.getHttpServer())
			.get('/product/' + randomId)
			.set('Authorization', bearer)
			.expect(404, {
				statusCode: 404,
				message: PRODUCT_NOT_FOUND_ERROR,
				error: 'Not Found',
			});
	});

	it('/product/:productId (PATCH) -- success', async () => {
		return await request(app.getHttpServer())
			.patch('/product/' + createdId)
			.set('Authorization', bearer)
			.send({ ...testDto, price: randomNumberValue })
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.price).toEqual(randomNumberValue);
			});
	});

	it('/product/:productId (PATCH) -- authorized-fail', () => {
		return request(app.getHttpServer())
			.patch('/product/' + createdId)
			.set('Authorization', randomStringValue)
			.expect(401, {
				statusCode: 401,
				message: 'Unauthorized',
			});
	});

	it('/product/:productId (PATCH) -- invalid-id-fail', () => {
		return request(app.getHttpServer())
			.patch('/product/' + randomNumberValue)
			.set('Authorization', bearer)
			.expect(400, {
				statusCode: 400,
				message: ID_VALIDATION_ERROR,
				error: 'Bad Request',
			});
	});

	it('/product/:productId (DELETE) -- success', () => {
		return request(app.getHttpServer())
			.delete('/product/' + createdId)
			.set('Authorization', bearer)
			.expect(200);
	});

	it('/product/:productId (DELETE) -- authorized-fail', () => {
		return request(app.getHttpServer())
			.delete('/product/' + createdId)
			.set('Authorization', randomStringValue)
			.expect(401, {
				statusCode: 401,
				message: 'Unauthorized',
			});
	});

	it('/product/:productId (DELETE) -- invalid-id-fail', () => {
		return request(app.getHttpServer())
			.delete('/product/' + randomNumberValue)
			.set('Authorization', bearer)
			.expect(400, {
				statusCode: 400,
				message: ID_VALIDATION_ERROR,
				error: 'Bad Request',
			});
	});

	afterAll(() => disconnect());
});
