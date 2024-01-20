import { Role } from "./role.model";

export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public gender: string,
        public about: string,
        public roles: Role[] = []
    ) {}
}