import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskController } from './task.controller';
import { TaskService } from './task.service'; 
import { Task } from './task.entity';
import { MultilingualtextModule } from '../multilingualtext/multilingualtext.module';
import { UtilModule } from '../../utils/util.module';
import { ActionModule } from '../action/action.module';  
import { UserTournamentTimeModule } from '../user.tournament.time/user.tournament.time.module';  
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), MultilingualtextModule, UserModule,
            UtilModule, forwardRef(() => ActionModule), UserTournamentTimeModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
