"use client"

import { createContext } from "react";

export interface IUserAuthLogin {
    userNameOrEmailAddress: string,
    password: string
}

export interface IUserCreate {
    userName?: string;
    name?: string;
    surname?: string;
    emailAddress?: string;
    password?: string;
}

export interface IUserAuthResponse {
    result: {
        accessToken: string;
        encryptedAccessToken: string;
        expireInSeconds: number;
        userId: number;
    };
    targetUrl: null | string;
    success: boolean;
    error: null | string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

export interface IUserStateContext {
    auth?: IUserAuthResponse;
    isInProgress?: any;
    error?: any;
}

export interface IUserActionContext {
    login: (userInput: IUserAuthLogin) => Promise<IUserAuthResponse>
    create: (userInput: IUserCreate) => Promise<IUserAuthResponse>
}

export const USER_AUTH_CONTEXT_INITIAL_STATE: IUserStateContext = {};

export const UserAuthStateContext = createContext<IUserStateContext>(USER_AUTH_CONTEXT_INITIAL_STATE);

export const UserAuthActionContext = createContext<IUserActionContext>({} as any);