import { Module } from '@nestjs/common';
import { PageModule } from '../page/page.module';
import { HhService } from './hh.service';

@Module({
	providers: [HhService],
	exports: [PageModule],
})
export class HhModule {}
