import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthoGuard } from '../../../configs/guard/auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user.response';
import { UserService } from '../service/user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async signUp(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.signUp(createUserDto);
        return new UserResponseDto(user);
    }

    @Get()
    @UseGuards(AuthoGuard)
    async findAll(): Promise<{ data: UserResponseDto[]; total: number }> {
        const [users, total] = await this.userService.findAll();
        return { data: users.map((user) => new UserResponseDto(user)), total };
    }

    @Get(':id')
    @UseGuards(AuthoGuard)
    async findOne(@Param('id') id: number) {
        const user = await this.userService.findOne(id);
        return new UserResponseDto(user);
    }

    @Patch(':id')
    @UseGuards(AuthoGuard)
    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const user = await this.userService.update(id, updateUserDto);
        return new UserResponseDto(user);
    }

    @Delete(':id')
    @UseGuards(AuthoGuard)
    async remove(@Param('id') id: number) {
        await this.userService.remove(id);
        return { message: 'Аккаунт удален' };
    }
}
