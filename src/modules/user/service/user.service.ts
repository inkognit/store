import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../../db/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new Users();
    createUserDto.login = user.login;
    createUserDto.password = user.password;
    createUserDto.first_name = user.first_name;
    createUserDto.middle_name = user.middle_name;
    createUserDto.last_name = user.last_name;
    createUserDto.bithday = user.bithday;
    return await this.usersRepo.save(user);
  }

  findAll(queries) {
    return `This action returns a #${queries} user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
