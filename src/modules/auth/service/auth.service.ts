import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new Auth';
  }

  findAll(queries) {
    return `This action returns a #${queries} Auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Auth`;
  }

  //   update(id: number, updateAuthDto: UpdateAuthDto) {
  //     return `This action updates a #${id} Auth`;
  //   }

  remove(id: number) {
    return `This action removes a #${id} Auth`;
  }
}
