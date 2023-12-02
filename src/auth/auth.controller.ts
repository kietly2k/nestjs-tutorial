import { Body, Controller, Post } from "@nestjs/common";
import AuthService from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export default class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    // Shouldn't use this `@Res() req: Request` because this is express.
    // In the feature NestJS use different framework this is not work. We should use NestJS abstraction which is @Body
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }
};