import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

// mongodb+srv://admin:<password>@merncluster.fv8zp.mongodb.net/?retryWrites=true&w=majority

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions(),
	};
};

const getMongoString = (configService: ConfigService) =>
	'mongodb+srv://' +
	configService.get('MONGO_LOGIN') +
	':' +
	configService.get('MONGO_PASSWORD') +
	'@' +
	configService.get('MONGO_HOST');

const getMongoOptions = () => ({
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
