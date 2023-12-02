import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { LigaService } from "./liga.service";
import { LigaCreateDto } from "./dto/liga.create.dto";
import { LigaListeDto } from "./dto/liga.list.dto";
import { LigaRetrieveDto } from "./dto/liga.retrieve.dto";

@Controller("liga")
export class LigaController {
  constructor(private readonly ligaService: LigaService) {}

  @Get()
  findAll(): Promise<LigaListeDto[]> {
    return this.ligaService.findAll();
  }

  @Get("/:id")
  findOne(@Param("id", ParseIntPipe) id: number): Promise<LigaRetrieveDto> {
    return this.ligaService.findOne(id);
  }

  @Post()
  create(@Body() ligaCreateDto: LigaCreateDto): Promise<LigaRetrieveDto> {
    return this.ligaService.create(ligaCreateDto);
  }
}
