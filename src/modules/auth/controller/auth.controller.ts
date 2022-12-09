import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    create(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.signIn(createAuthDto);
    }

    @Get()
    findAll(@Query() queries) {
        return this.authService.refreshToken(queries);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.authService.signOut(+id);
    }
}
