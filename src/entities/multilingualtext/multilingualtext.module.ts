import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { multilingualtextProviders } from './multilingualtext.providers';
import { MultilingualtextService } from './multilingualtext.service';


@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    ...multilingualtextProviders,
    MultilingualtextService
    ],
  exports: [MultilingualtextService]

})
export class MultilingualtextModule {}


