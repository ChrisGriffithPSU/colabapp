import dotenv from 'dotenv';

dotenv.config({});

if (process.env.ENABLE_APM == '1') {
    require('elastic-apm-node').start({
        serviceName: 'colab-document',
        serverUrl: process.env.ELASTIC_APM_SERVER_URL,
        secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
        environment: process.env.NODE_ENV,
        active: true,
        captureBody: 'all',
        errorOnAbortedRequests: true,
        captureErrorLogStackTraces: 'always'
    });
}

class Config {
    public DATABASE_URL: string | undefined;
    public NODE_ENV: string | undefined;
    public RABBITMQ_ENDPOINT: string | undefined;
    public JWT_TOKEN: string | undefined;
    public GATEWAY_JWT_TOKEN: string | undefined;
    public API_GATEWAY_URL: string | undefined;
    public REDIS_HOST: string | undefined;
    public ELASTIC_SEARCH_URL: string | undefined;

    constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || '';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT || '';
    this.JWT_TOKEN = process.env.JWT_TOKEN || '';
    this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN || '';
    this.API_GATEWAY_URL = process.env.API_GATEWAY_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
    this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL || '';
    }
}

export const config: Config = new Config();