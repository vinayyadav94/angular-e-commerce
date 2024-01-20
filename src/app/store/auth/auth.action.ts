import { createAction, props } from "@ngrx/store";
import { loginResponse } from "../../models/loginResponse.model";

export const setLoginData = createAction(
    "SET_LOGIN_DATA",
    props<loginResponse>()
    );

export const removeLoginData = createAction("REMOVE_LOGIN_DATA")