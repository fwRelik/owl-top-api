import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { CreatePageDto } from './dto/create-page.dto';
import { FindPageDto } from './dto/find-page.dto';
import { NOT_FOUND_PAGE_ERROR } from './page.constants';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
	constructor(private readonly pageService: PageService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreatePageDto) {
		return this.pageService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.pageService.findById(id);
		if (!page) throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
		return page;
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('id') alias: string) {
		const page = await this.pageService.findByAlias(alias);
		if (!page) throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
		return page;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedPage = await this.pageService.deleteById(id);
		if (!deletedPage) throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
		return deletedPage;
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreatePageDto) {
		const updatedPage = await this.pageService.updateById(id, dto);
		if (!updatedPage) throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
		return updatedPage;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindPageDto) {
		return this.pageService.findByCategory(dto.firstCategory);
	}
}
