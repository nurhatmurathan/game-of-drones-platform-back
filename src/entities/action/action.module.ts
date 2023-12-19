 import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { ActionService } from './action.service';
// import { ActionController } from './action.controller'; 
// import { Action } from './action.entity';
// import { TaskModule } from '../task/task.module';
// import { UserTournamentTimeModule } from '../user.tournament.time/user.tournament.time.module';
// import { MultilingualtextModule } from '../multilingualtext/multilingualtext.module';

@Module({
  // imports: [TypeOrmModule.forFeature([Action]), 
  //           TaskModule, UserTournamentTimeModule, MultilingualtextModule],
  // controllers: [ActionController],
  // providers: [ActionService],
  // exports: [ActionService]
})
export class ActionModule {}
