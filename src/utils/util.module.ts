import { Module } from '@nestjs/common';

import { GetLanguageFromHeaderService } from './util.getlanguage.service';


@Module({
  providers: [GetLanguageFromHeaderService],
  exports: [GetLanguageFromHeaderService]
})
export class UtilModule {}


