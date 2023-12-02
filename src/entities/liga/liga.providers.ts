import { DataSource } from 'typeorm';
import { Liga } from './liga.entity';

export const ligaProviders = [
  {
    provide: 'LIGA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Liga),
    inject: ['DATA_SOURCE'],
  },
];