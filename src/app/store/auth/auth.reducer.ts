import { createReducer , on} from "@ngrx/store";
import { loginResponse } from "src/app/models/loginResponse.model";
import { removeLoginData, setLoginData } from "./auth.action";

export const initialState: loginResponse = {
    jwtToken: '',
    user: null,
    login: false
};

export const authReducer = createReducer(initialState, on(setLoginData, (oldState, payload)=>{
    console.log('set login data with reducer', payload);
    return {...oldState, ...payload, login: true};
}),
    on(removeLoginData, (state) => {
        return {
            jwtToken: '',
            user: null,
            login: false
        }
    })
)