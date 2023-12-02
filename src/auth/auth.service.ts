import { Injectable } from "@nestjs/common";

@Injectable({})
export default class AuthService {
    signup() {
        return "This is sign up";
    }

    signin() {
        return "This is sign in";
    }
};