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
        const result = await this.userService.signUp(createUserDto);
        return new UserResponseDto(result);
    }

    @Get()
    @UseGuards(AuthoGuard)
    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userService.findAll();
        return users.map((user) => new UserResponseDto(user));
    }

    @Get(':id')
    @UseGuards(AuthoGuard)
    async findOne(@Param('id') id: string) {
        const user = await this.userService.findOne(+id);
        return new UserResponseDto(user);
    }

    @Patch(':id')
    @UseGuards(AuthoGuard)
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(AuthoGuard)
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
