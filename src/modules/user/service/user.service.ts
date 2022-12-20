import { Injectable, NotFoundException } from '@nestjs/common';
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
        private readonly usersRepository: Repository<Users>,
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
        return await this.usersRepository.save(user);
    }

    async findAll() {
        return this.usersRepository.find();
    }

    async findOne(id: number) {
        const user = await this.usersRepository.findOne({
            where: {
                id,
            },
        });
        if (!user) throw new NotFoundException('Такой пользователь не найден');
        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        function colorOf(r, g, b) {
            let red = r.toString(16),
                green = g.toString(16),
                blue = b.toString(16);
            if (r === red) red = 0 + r;
            if (g === green) green = 0 + g;
            if (b === blue) blue = 0 + b;
            return `#${red}${green}${blue}`;
        }
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
