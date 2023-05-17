import {
    Body,
    Controller,
    Delete,
    Headers,
    Ip,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user.response';
import { CreateAuthDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    async signIn(
        @Body() createAuthDto: CreateAuthDto,
        @Ip() ip: string,
        @Headers() headers,
    ) {
        const response = await this.authService.signIn(
            createAuthDto,
            ip,
            headers['user-agent'],
        );
        return { ...response, user: new UserResponseDto(response.user) };
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
