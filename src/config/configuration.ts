import {
    object,
    number,
    boolean,
    string
} from "joi";

export const validateSchema = object({
    APP_PORT: number().default(3000),
    APP_VERSION: string().required(),
    NODE_ENV: string().valid('prod', 'dev', 'test').required(),
    DB_HOST: string().default('localhost'),
    DB_PORT: number().required().default(5432),
    DB_USERNAME: string().required(),
    DB_PASSWORD: string().required(),
    DB_DATABASE: string().required(),
    MIGRATIONS_RUN: boolean().required(),    
    EMAIL_ENABLED: boolean().default(false)
});
