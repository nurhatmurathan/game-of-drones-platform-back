import { DataSource } from "typeorm";
import { MultilingualText } from "./multilingualtext.entity";

export const multilingualtextProviders = [
    {
        provide: "MULTILINGUALTEXT_REPOSITORY",
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(MultilingualText),
        inject: ["DATA_SOURCE"],
    },
];
