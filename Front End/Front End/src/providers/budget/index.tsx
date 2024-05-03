"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import axios from "axios";
import { statementReducer } from "./reducer";
import { getAllStatementsForUserAction } from "./actions";
import { IStatement, STATEMENT_CONTEXT_INITIAL_STATE, StatementActionContext, StatementStateContext } from "./context";

const StatementProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(statementReducer, STATEMENT_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);

    const getAllStatementsForUser = (): Promise<IStatement[]> =>
        new Promise((resolve, reject) => {
            {
                axios.get(`https://localhost:44311/api/services/app/Statement/GetAllStatementsForUser?userId=${localStorage.getItem('userId')}`)
                    .then((response) => {
                        console.log(response.data.result)
                        dispatch(getAllStatementsForUserAction(response.data.result));
                        setIsInProgress(false);
                        resolve(response.data);
                    })
                    .catch(e => {
                        setIsInProgress(false);
                        reject(e.message);
                    })
            }
        });


    return (
        <StatementStateContext.Provider
            value={{
                ...state,
                isInProgress,
            }}>
            <StatementActionContext.Provider
                value={{
                    getAllStatementsForUser,
                }}>
                {children}
            </StatementActionContext.Provider>
        </StatementStateContext.Provider>
    );
}

const useStateContext = () => {
    const context = useContext(StatementStateContext);

    if (context == undefined) {
        throw new Error('useTransactionState must be used within a TransactionProvider');
    }
    return context;
}

const useActionsContext = () => {
    const context = useContext(StatementActionContext);

    if (context == undefined) {
        throw new Error('useTransactionActions must be used within a TransactionProvider');
    }
    return context;
}

const useTransaction = () => {
    return { ...useStateContext(), ...useActionsContext() };
};

export { useTransaction, StatementProvider };