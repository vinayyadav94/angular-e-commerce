import { User } from "./user.model";

export interface loginResponse {
    jwtToken: string,
    user: User
}