import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../item/item.entity';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
    ) { }

    async findOne(id: number): Promise<Item> {
        return this.itemRepository.findOne({ where: { id: id } });
    }

}
