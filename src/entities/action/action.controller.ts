// import {
//     Req,
//     Body,
//     Controller,
//     Get,
//     Param,
//     ParseIntPipe,
//     Post,
//     HttpCode,
//     HttpStatus,
//     UseGuards,
// } from "@nestjs/common";
// import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

// import { ActionCreateDto } from './dto/action.create.dto';
// // import { ActionService } from './action.service';
// import { Action } from "./action.entity"; 


// @ApiTags()
// @Controller('action')
// export class ActionController {
//     constructor(
//         private readonly actionService: ActionService
//     ) {}

//     @Post()
//     @ApiBearerAuth()
//     @HttpCode(HttpStatus.CREATED)
//     create(@Body() actionCreateDto: ActionCreateDto): Promise<Action> {
//         return this.actionService.create(actionCreateDto);
//     }
// }
