import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './dto/user.create.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>,
      ) {}

  public async create(userData: UserCreateDto){
    const { password, ...res } = userData
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = this.userRepository.create({
      ...res,
      password: hashedPassword
    })
    
    await this.userRepository.save(newUser)

    return { detail: "saved"}
  }
  
}