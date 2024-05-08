"use client"
import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import { userAuthReducer } from "./reducer";
import { IUserAuthLogin, IUserAuthResponse, IUserCreate, USER_AUTH_CONTEXT_INITIAL_STATE, UserAuthActionContext, UserAuthStateContext } from "./context";
import { userLoginAction, userCreateAction } from "./actions";
import axios from "axios";

const UserAuthProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(userAuthReducer, USER_AUTH_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');
    const [errorCreate, setErrorCreate] = useState('');

    const login = (userInput: IUserAuthLogin): Promise<IUserAuthResponse> =>
        new Promise((resolve, reject) => {
            {
                setIsInProgress(true);
                axios.post('https://localhost:44311/api/TokenAuth/Authenticate', userInput)
                .then((response) => {
                    
                    setErrorLogin('');
                    setIsInProgress(false);
                    resolve(response.data);
                    dispatch(userLoginAction(response.data));
                    })
                    .catch(e => {
                        setIsInProgress(false);
                        setErrorLogin(e.message);
                        reject(e.message)
                    });
            }
        });

    const create = (userInput: IUserCreate): Promise<IUserAuthResponse> =>
        new Promise((resolve, reject) => {
            setIsInProgress(true);
            axios.post('https://localhost:44311/api/services/app/User/Create', userInput)
            .then((response) => {
                
                setErrorCreate('');
                setIsInProgress(false);
                resolve(response.data);
                })
                .catch(e => {
                    console.log(e.message);
                    setErrorCreate(e.message);
                    reject(e.message);
                })
        })

    return (
        <UserAuthStateContext.Provider
            value={{
                ...state,
                isInProgress:  isInProgress ,
                error:  errorLogin ,
            }}
        >
            <UserAuthActionContext.Provider
                value={{ 
                    login,
                    create,
                 }}
            >
                {children}
            </UserAuthActionContext.Provider>
        </UserAuthStateContext.Provider>
    );
};

const useStateContext = () => {
    const context = useContext(UserAuthStateContext);

    if (context == undefined) {
        throw new Error('useAuthState must be used within an AuthProvider');
    }
    return context;
}

const useActionsContext = () => {
    const context = useContext(UserAuthActionContext);

    if (context == undefined) {
        throw new Error('useAuthActions must be used within a AuthProvider');
    }
    return context;
}

const useUser = () => {
    return {...useStateContext(), ...useActionsContext()};
};

export {useUser, UserAuthProvider};