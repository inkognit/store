import {
    Body,
    Controller,
    Delete,
    Ip,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from '../../user/dto/user.response';
import { CreateAuthDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async signIn(@Body() createAuthDto: CreateAuthDto, @Ip() ip: string) {
        const response = await this.authService.signIn(createAuthDto, ip);
        const user = new UserResponseDto(response.user);
        return { ...response, user };
    }

    @Patch()
    refreshToken(@Query() queries) {
        return this.authService.refreshToken(queries);
    }

    @Delete(':id')
    signOut(@Param('id') id: string) {
        return this.authService.signOut(+id);
    }
}
