import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreatePageDto } from './dto/create-page.dto';
import { PageModel, TopLevelCategory } from './page.model/page.model';
import { FindPageDto } from './dto/find-page.dto';

@Injectable()
export class PageService {
	constructor(@InjectModel(PageModel) private readonly pageModel: ModelType<PageModel>) {}

	async create(dto: CreatePageDto) {
		return this.pageModel.create(dto);
	}

	async findById(id: string) {
		return this.pageModel.findById(id).exec();
	}

	async findByAlias(alias: string) {
		return this.pageModel.findOne({ alias }).exec();
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		return this.pageModel
			.aggregate()
			.match({ firstCategory })
			.group({
				_id: { secondCategory: '$secondCategory' },
				page: { $push: { alias: '$alias', title: '$title' } },
			})
			.exec();
	}

	async findByText(text: string) {
		return this.pageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
	}

	async deleteById(id: string) {
		return this.pageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: FindPageDto) {
		return this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}
}
