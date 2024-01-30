import { createReducer , on} from "@ngrx/store";
import { loginResponse } from "src/app/models/loginResponse.model";
import { removeLoginData, setLoginData } from "./auth.action";
import { AuthService } from "src/app/services/auth.service";

export const initialState: loginResponse = AuthService.getLoginDataFromLocalStorage() ?
    AuthService.getLoginDataFromLocalStorage() : {
        jwtToken: '',
        user: undefined,
        login: false
    };

export const authReducer = createReducer(initialState, on(setLoginData, (oldState, payload)=>{
    console.log('set login data with reducer', payload);
    return {...oldState, ...payload, login: true};
}),
    on(removeLoginData, (state) => {
        return {
            jwtToken: '',
            user: undefined,
            login: false
        }
    })
)