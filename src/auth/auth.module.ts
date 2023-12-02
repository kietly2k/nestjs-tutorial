import { Module } from "@nestjs/common";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/strategy";

@Module({
    // Use import to define that JwtModule and it services can accessable in this Auth module
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    // Add strategy to validate token that client pass in
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {};