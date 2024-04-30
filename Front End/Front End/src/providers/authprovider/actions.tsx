"use client"

import { createAction } from "redux-actions";
import { IUserAuthLogin, IUserAuthResponse, IUserCreate, IUserStateContext } from "./context";

export enum UserAuthActions {
    USER_LOGIN = "USER_LOGIN",
    USER_CREATE = 'USER_CREATE',
}

export const userLoginAction = createAction<IUserStateContext, IUserAuthResponse>(
    UserAuthActions.USER_LOGIN,
    (auth) => ({auth}),
);

export const userCreateAction = createAction<IUserStateContext, IUserAuthResponse>(
    UserAuthActions.USER_CREATE,
    (auth) => ({auth}),
);