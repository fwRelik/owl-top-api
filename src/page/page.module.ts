import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PageController } from './page.controller';
import { PageModel } from './page.model/page.model';

@Module({
	controllers: [PageController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: PageModel,
				schemaOptions: {
					collection: 'Page',
				},
			},
		]),
	],
})
export class PageModule {}
