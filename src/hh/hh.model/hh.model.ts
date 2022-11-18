export interface Department {
	id: string;
	name: string;
}

export interface Area {
	id: string;
	name: string;
	url: string;
}

export interface Salary {
	from?: number;
	to?: number;
	currency: string;
	gross: boolean;
}

export interface Type {
	id: string;
	name: string;
}

export interface Metro {
	station_name: string;
	line_name: string;
	station_id: string;
	line_id: string;
	lat: number;
	lng: number;
}

export interface Address {
	city: string;
	street: string;
	building: string;
	description?: any;
	lat?: number;
	lng?: number;
	raw: string;
	metro: Metro;
	metro_stations: Metro[];
	id: string;
}

export interface LogoUrls {
	240: string;
	90: string;
	original: string;
}

export interface Employer {
	id: string;
	name: string;
	url: string;
	alternate_url: string;
	logo_urls: LogoUrls;
	vacancies_url: string;
	trusted: boolean;
}

export interface Snippet {
	requirement: string;
	responsibility: string;
}

export interface Schedule {
	id: string;
	name: string;
}

export interface Vacancy {
	id: string;
	premium: boolean;
	name: string;
	department: Department;
	has_test: boolean;
	response_letter_required: boolean;
	area: Area;
	salary: Salary;
	type: Type;
	address: Address;
	response_url: string;
	sort_point_distance?: any;
	published_at: Date;
	created_at: Date;
	archived: boolean;
	apply_alternate_url: string;
	insider_interview?: any;
	url: string;
	adv_response_url: string;
	alternate_url: string;
	relations: any[];
	employer: Employer;
	snippet: Snippet;
	contacts?: any;
	schedule: Schedule;
	working_days: any[];
	working_time_intervals: any[];
	working_time_modes: any[];
	accept_temporary: boolean;
}

export interface ClusterElement {
	name: string;
	url: string;
	count: number;
}

export interface Cluster {
	name: string;
	id: string;
	items: ClusterElement[];
}

export interface HhModel {
	items: Vacancy[];
	found: number;
	pages: number;
	per_page: number;
	page: number;
	clusters: Cluster[];
	arguments?: any;
	alternate_url: string;
}
