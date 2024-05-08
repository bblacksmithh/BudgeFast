"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import axios from "axios";
import { ICreateTransaction, IDeleteTransaction, IIncomeVsExpenses, ITransaction, TRANSACTION_CONTEXT_INITIAL_STATE, TransactionActionContext, TransactionStateContext } from "./context";
import { transactionReducer } from "./reducer";
import { getAllExpensesForUserAction, getAllIncomeForUserAction, createTransactionAction, getIncomeVsExpensesAction } from "./actions";

const TransactionProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(transactionReducer, TRANSACTION_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);

    const getAllIncomeForUser = (): Promise<ITransaction[]> =>
        new Promise((resolve, reject) => {
            {
                axios.get(`https://localhost:44311/api/services/app/Transaction/GetAllIncomeForUser?UserId=${localStorage.getItem('userId')}`)
                    .then((response) => {
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
            axios.get(`https://localhost:44311/api/services/app/Transaction/GetAllExpensesForUser?UserId=${localStorage.getItem('userId')}`)
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
                    axios.get(`https://localhost:44311/api/services/app/Transaction/GetAllExpensesForUser?UserId=${localStorage.getItem('userId')}`)
                        .then((expenseResult) => {
                            dispatch(getAllExpensesForUserAction(expenseResult.data.result));
                            // resolve(expenseResult.data);
                        })
                        .catch(e => {
                            setIsInProgress(false);
                            reject(e.message);
                        })
                    axios.get(`https://localhost:44311/api/services/app/Transaction/GetAllIncomeForUser?UserId=${localStorage.getItem('userId')}`)
                        .then((incomeResult) => {
                            dispatch(getAllIncomeForUserAction(incomeResult.data.result));
                            // resolve(incomeResult.data);
                        })
                        .catch(e => {
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

    const deleteTransaction = (transactionId: IDeleteTransaction) =>
        new Promise<void>((resolve, reject) => {
            setIsInProgress(true);
            axios.delete(`https://localhost:44311/api/services/app/Transaction/DeleteTransaction?id=${transactionId.id}`)
                .then(response => {
                    resolve(response.data);
                    axios.get(`https://localhost:44311/api/services/app/Transaction/GetAllExpensesForUser?UserId=${localStorage.getItem('userId')}`)
                        .then((expenseResult) => {
                            dispatch(getAllExpensesForUserAction(expenseResult.data.result));
                            // resolve(expenseResult.data);
                        })
                        .catch(e => {
                            setIsInProgress(false);
                            reject(e.message);
                        })
                    axios.get(`https://localhost:44311/api/services/app/Transaction/GetAllIncomeForUser?UserId=${localStorage.getItem('userId')}`)
                        .then((incomeResult) => {
                            dispatch(getAllIncomeForUserAction(incomeResult.data.result));
                            // resolve(incomeResult.data);
                        })
                        .catch(e => {
                            setIsInProgress(false);
                            reject(e.message);
                        })
                    setIsInProgress(false);
                })
                .catch(e => {
                    reject(e.message);
                    setIsInProgress(false)
                })
        })

    const getIncomeVsExpenses = (): Promise<IIncomeVsExpenses[]> =>
        new Promise((resolve, reject) => {
            setIsInProgress(true);
            axios.get(`https://localhost:44311/api/services/app/Transaction/GetIncomeVsExpenses?UserId=${localStorage.getItem('userId')}`)
                .then((response) => {
                    resolve(response.data);
                    dispatch(getIncomeVsExpensesAction(response.data.result));
                    setIsInProgress(false);
                }
                )
                .catch(e => {
                    reject(e.message);
                    console.log(e.message);
                    setIsInProgress(false);
                })
        })

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
                    deleteTransaction,
                    getIncomeVsExpenses,
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