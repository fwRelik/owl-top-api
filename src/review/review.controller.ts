import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UserEmail } from '../decorators/user-email.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
	}

	@UseGuards(JwtAuthGuard)
	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string, @UserEmail() email: string) {
		// Can use @UserEmail decorator if you have the @UseGuards decorator
		console.log(`User email: ${email}`);
		return this.reviewService.findByProductId(productId);
	}
}
