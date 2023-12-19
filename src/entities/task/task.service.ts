// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';


// import { Task } from './task.entity';
// import { TaskCreateDto } from './dto/task.create.dto';
// import { TaskListDto } from './dto/task.list.dto';
// import { TaskRetrieveDto } from './dto/task.retrieve.dto';
// import { MultilingualtextService } from '../multilingualtext/multilingualtext.service';


// @Injectable()
// export class TaskService {
//     constructor( 
//         @InjectRepository(Task)
//         private readonly taskReposotory: Repository<Task>,
//         private readonly multilingualTextService: MultilingualtextService 
//     ) {}

//     async findAll(language: string): Promise<TaskListDto[]> {
//         const taskList = await this.taskReposotory.find({
//             relations: ['description', 'taskDescription']
//         });

//         const taskListDto = taskList.map((task) => {
//             const description = task.description[language];
//             const taskDescription = task.taskDescription[language];

//             return {
//                 id: task.id,
//                 name: task.name,
//                 description: description,
//                 taskDescription: taskDescription 
//             }
//         });
        
//         return taskListDto;
//     }
    
//     async findOne(id: number, userId: number, language: string): Promise<TaskRetrieveDto> {
//         const taskInstance = await this.taskReposotory.findOne({
//             where: { id: id },
//             relations: ['description', 'taskDescription']
//         });

//         var description = taskInstance.description[language];
//         var taskDescription = taskInstance.taskDescription[language];

        


//         return {
//             id: taskInstance.id,
//             name: taskInstance.name,
//             description: taskDescription,
//             maxCount: taskInstance.maxCount,
//             reward: taskInstance.reward
//         } 
//     }

//     async create(taskData: TaskCreateDto): Promise<TaskCreateDto> {
//         const { description, taskDescription, ...task} = taskData

//         const multilingualTextDescription = await this.multilingualTextService.create(description)
//         const multilingualTexTaskDescription = await this.multilingualTextService.create(taskDescription)
//         const newTask = this.taskReposotory.create({
//             ...task,
//             description: multilingualTextDescription,
//             taskDescription: multilingualTexTaskDescription
//         });

//         return await this.taskReposotory.save(newTask); 
//     }
    
//     findOneInstance(id: number): Promise<Task> {
//         return this.taskReposotory.findOne({where: {id: id}});
//     }

// }
