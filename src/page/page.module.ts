import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { HhModule } from '../hh/hh.module';
import { PageController } from './page.controller';
import { PageModel } from './page.model/page.model';
import { PageService } from './page.service';

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
		HhModule,
	],
	providers: [PageService],
	exports: [PageService],
})
export class PageModule {}
