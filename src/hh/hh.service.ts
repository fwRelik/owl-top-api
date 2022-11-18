import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_URL, CLUSTER_FIND_ERROR, SALARY_CLUSTER_ID } from './hh.constants';
import { HhModel } from './hh.model/hh.model';
import { HhData } from '../page/page.model/page.model';

@Injectable()
export class HhService {
	private token: string;

	constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {
		// Нужнен рефаторинг
		this.token = this.configService.get('HH_TOKEN') ?? '';
	}

	async getData(text: string) {
		try {
			const { data } = await lastValueFrom(
				this.httpService.get<HhModel>(API_URL.vacancies, {
					params: {
						text,
						clusters: true,
					},
					headers: {
						'User-Agent': 'unknown',
					},
				})
			);
			return this.parseData(data);
		} catch (e) {
			Logger.error(e);
		}
	}

	private parseData(data: HhModel): HhData {
		const salaryCluster = data.clusters.find(c => c.id == SALARY_CLUSTER_ID);
		if (!salaryCluster) throw new Error(CLUSTER_FIND_ERROR);

		const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name);
		const middleSalary = this.getSalaryFromString(
			salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name
		);
		const seniorSalary = this.getSalaryFromString(salaryCluster.items[salaryCluster.items.length - 1].name);

		return {
			count: data.found,
			juniorSalary,
			middleSalary,
			seniorSalary,
			updatedAt: new Date(),
		};
	}

	private getSalaryFromString(s: string): number {
		return +s.replace(/\D/g, '') || 0;
	}
}
