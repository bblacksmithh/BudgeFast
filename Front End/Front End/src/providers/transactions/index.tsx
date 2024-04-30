"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import axios from "axios";
import { ICreateTransaction, ITransaction, TRANSACTION_CONTEXT_INITIAL_STATE, TransactionActionContext, TransactionStateContext } from "./context";
import { transactionReducer } from "./reducer";
import { getAllExpensesForUserAction, getAllIncomeForUserAction, createTransactionAction } from "./actions";

const TransactionProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(transactionReducer, TRANSACTION_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);

    const getAllIncomeForUser = (): Promise<ITransaction[]> =>
        new Promise((resolve, reject) => {
            {
                axios.get('https://localhost:44311/api/services/app/Transaction/GetAllIncomeForUser?UserId=1')
                    .then((response) => {
                        console.log(response.data.result)
                        dispatch(getAllIncomeForUserAction(response.data.result));
                        setIsInProgress(false);
                        resolve(response.data);
                    })
                    .catch(e => {
                        setIsInProgress(false);
                        reject(e.message);
                    })
            }
        });

    const getAllExpensesForUser = (): Promise<ITransaction[]> =>
        new Promise((resolve, reject) => {
            setIsInProgress(true);
            axios.get('https://localhost:44311/api/services/app/Transaction/GetAllExpensesForUser?UserId=1')
                .then((response) => {
                    dispatch(getAllExpensesForUserAction(response.data.result));
                    setIsInProgress(false);
                    resolve(response.data);
                })
                .catch(e => {
                    setIsInProgress(false);
                    reject(e.message);
                })
        });

    const createTransaction = (createTransaction: ICreateTransaction) =>
        new Promise<void>((resolve, reject) => {
            setIsInProgress(true);
            axios.post('https://localhost:44311/api/services/app/Transaction/CreateTransaction', createTransaction)
                .then((response) => {
                    // dispatch(createTransactionAction(response.data));
                    axios.get('https://localhost:44311/api/services/app/Transaction/GetAllExpensesForUser?UserId=1')
                    .then((expenseResult) => {
                        dispatch(getAllExpensesForUserAction(expenseResult.data.result));
                        // resolve(expenseResult.data);
                    })
                    .catch (e => {
                        setIsInProgress(false);
                        reject(e.message);
                    })
                    axios.get('https://localhost:44311/api/services/app/Transaction/GetAllIncomeForUser?UserId=1')
                    .then((incomeResult) => {
                        dispatch(getAllIncomeForUserAction(incomeResult.data.result));
                        // resolve(incomeResult.data);
                    })
                    .catch (e => {
                        setIsInProgress(false);
                        reject(e.message);
                    })
                    setIsInProgress(false);
                    resolve(response.data);
                })
                .catch(e => {
                    setIsInProgress(false);
                    reject(e.message);
                })
        });

    return (
        <TransactionStateContext.Provider
            value={{
                ...state,
                isInProgress,
            }}>
            <TransactionActionContext.Provider
                value={{
                    getAllIncomeForUser,
                    getAllExpensesForUser,
                    createTransaction,
                }}>
                {children}
            </TransactionActionContext.Provider>
        </TransactionStateContext.Provider>
    );
}

const useStateContext = () => {
    const context = useContext(TransactionStateContext);

    if (context == undefined) {
        throw new Error('useTransactionState must be used within a TransactionProvider');
    }
    return context;
}

const useActionsContext = () => {
    const context = useContext(TransactionActionContext);

    if (context == undefined) {
        throw new Error('useTransactionActions must be used within a TransactionProvider');
    }
    return context;
}

const useTransaction = () => {
    return { ...useStateContext(), ...useActionsContext() };
};

export { useTransaction, TransactionProvider };