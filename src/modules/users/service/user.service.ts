import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { DataSource, Repository } from 'typeorm';
import { Users } from '../../../db/entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private readonly dataSourse: DataSource,
    ) {}

    async signUp(createUserDto: CreateUserDto) {
        const { login, password } = createUserDto;
        const is_login_check = await this.usersRepository.findOne({
            where: { login },
        });
        if (is_login_check) {
            throw new BadRequestException('Такой логин уже существует');
        }
        const regExp = new RegExp(
            /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,32}/g,
        );
        const is_password_check = regExp.test(password);
        if (!is_password_check) {
            throw new BadRequestException(
                'Пароль должен быть не менее 8-ми символов в длину и не более 32. Содержать символы латинского алфавита верхнего и нижнего региста и иметь в составе цифры',
            );
        }
        const salt = Buffer.from(process.env.SALT);
        const user = new Users();
        user.login = login;
        user.password = await argon2.hash(password, { salt });
        user.first_name = createUserDto.first_name;
        user.middle_name = createUserDto.middle_name;
        user.last_name = createUserDto.last_name;
        user.bithday = createUserDto.bithday;
        user.avatar = createUserDto.avatar;
        return await this.usersRepository.save(user);
    }

    async findAll() {
        return this.dataSourse
            .createQueryBuilder()
            .select('u')
            .from(Users, 'u')
            .orderBy('u.create_at', 'ASC')
            .getManyAndCount();
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

    async update(id: number, updateData: UpdateUserDto) {
        const user = await this.usersRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new NotFoundException('Такой пользователь не найден');
        }
        const { password, new_password } = updateData;
        if (password) {
            const salt = Buffer.from(process.env.SALT);
            const access = await argon2.verify(user.password, password, {
                salt,
            });
            if (access) {
                user.password = await argon2.hash(new_password, { salt });
            } else {
                throw new BadRequestException('Ошибка изменения пароля');
            }
        }
        user.first_name = updateData.first_name;
        user.middle_name = updateData.middle_name;
        user.last_name = updateData.last_name;
        user.bithday = updateData.bithday;
        user.avatar = updateData.avatar;
        user.update_at = new Date();
        return this.usersRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.usersRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new NotFoundException('Такой пользователь не найден');
        }
        return this.usersRepository.remove(user);
    }
}
