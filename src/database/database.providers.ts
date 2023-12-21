import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide: "DATA_SOURCE",
        useFactory: async () => {
            const dataSource = new DataSource({
                type: "postgres",
                host: process.env.CLOUD_DATABASE_HOST,
                port: 5432,
                password: process.env.CLOUD_DATABASE_PASS,
                username: process.env.CLOUD_DATABASE_USER,
                database: process.env.CLOUD_DATABASE,
                entities: [__dirname + "/../**/*.entity{.ts,.js}"],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];
