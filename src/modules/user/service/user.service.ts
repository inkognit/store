import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { Users } from '../../../db/entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepo: Repository<Users>,
    ) {}
    async signUp(createUserDto: CreateUserDto) {
        const user = new Users();
        user.id;
        user.login = createUserDto.login;
        const salt = Buffer.from(process.env.SALT);
        user.password = await argon2.hash(createUserDto.password, { salt });
        user.first_name = createUserDto.first_name;
        user.middle_name = createUserDto.middle_name;
        user.last_name = createUserDto.last_name;
        user.bithday = createUserDto.bithday;
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
