import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const ormConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.CLOUD_DATABASE_HOST,
    port: 5432,
    username: process.env.CLOUD_DATABASE_USER,
    password: process.env.CLOUD_DATABASE_PASS,
    database: process.env.CLOUD_DATABASE_NAME,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
};

const testOrmConfig: TypeOrmModuleOptions = {
    type: "sqlite",
    database: "test.db",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
};

const config = process.env.NODE_ENV === "test" ? testOrmConfig : ormConfig;

export = config;

console.log(config);
console.log(process.cwd());
console.log(process.env.CLOUD_DATABASE_USER);
console.log(process.env.CLOUD_DATABASE_NAME);
