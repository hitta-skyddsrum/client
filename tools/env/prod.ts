import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  API: 'http://hs-api.width.se/api/v1',
  GA_ACCOUNT: 'UA-49029089-1',
};

export = ProdConfig;

