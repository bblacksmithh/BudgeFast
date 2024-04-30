"use client"

import { UserAuthActions, userLoginAction } from "./actions";
import { IUserStateContext } from "./context";

export function userAuthReducer(state: IUserStateContext, action: ReduxActions.Action<IUserStateContext>) {
    const { type, payload } = action;

    switch (type) {
        case UserAuthActions.USER_CREATE:
        case UserAuthActions.USER_LOGIN:
            return {
                ...state,
                ...payload,
            }
        default:
            return state;
    }
}