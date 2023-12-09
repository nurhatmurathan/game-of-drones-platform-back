import { DataSource } from 'typeorm';
import { Multilingualtext } from './multilingualtext.entity';

export const multilingualtextProviders = [
  {
    provide: 'MULTILINGUALTEXT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Multilingualtext),
    inject: ['DATA_SOURCE'],
  },
];