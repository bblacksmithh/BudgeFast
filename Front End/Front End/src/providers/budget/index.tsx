"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import axios from "axios";
import { budgetReducer } from "./reducer";
import { getAllBudgetsAndSpendingForUserAction, getAllBudgetsForUserAction } from "./actions";
import { IBudget, BUDGET_CONTEXT_INITIAL_STATE, BudgetStateContext, BudgetActionContext, IAddBudget } from "./context";

const BudgetProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(budgetReducer, BUDGET_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);

    const getBudgetsForUser = (): Promise<IBudget[]> =>
        new Promise((resolve, reject) => {
            {
                axios.get(`https://localhost:44311/api/services/app/Budget/GetBudgetsForUser?userId=${localStorage.getItem('userId')}`)
                    .then((response) => {
                        dispatch(getAllBudgetsForUserAction(response.data.result));
                        setIsInProgress(false);
                        resolve(response.data);
                    })
                    .catch(e => {
                        setIsInProgress(false);
                        reject(e.message);
                    })
            }
        });

        const getBudgetsAndSpendingForUser = (): Promise<IBudget[]> =>
            new Promise((resolve, reject) => {
                {
                    axios.get(`https://localhost:44311/api/services/app/Budget/GetBudgetsAndSpendingForUser?userId=${localStorage.getItem('userId')}`)
                        .then((response) => {
                            dispatch(getAllBudgetsAndSpendingForUserAction(response.data.result));
                            setIsInProgress(false);
                            resolve(response.data);
                        })
                        .catch(e => {
                            setIsInProgress(false);
                            reject(e.message);
                        })
                }
            });

        const addBudget = (budget: IAddBudget) => 
            new Promise<void>((resolve, reject) => {
                setIsInProgress(true);
                axios.post('https://localhost:44311/api/services/app/Budget/AddBudget', budget)
                .then(response => {
                    resolve(response.data);
                    setIsInProgress(false);
                })
                .catch(e => {
                    console.log(e.message);
                    reject(e.message);
                    setIsInProgress(false);
                })
            })

        const deleteBudget = (id: string) => 
            new Promise<void>((resolve, reject) => {
                setIsInProgress(true);
                axios.delete(`https://localhost:44311/api/services/app/Budget/DeleteBudgetForUser?budgetId=${id}`)
                .then(response => {
                    resolve(response.data);
                    setIsInProgress(false);
                })
                .catch(e => {
                    reject(e.message);
                    setIsInProgress(false)
                })
            })

    return (
        <BudgetStateContext.Provider
            value={{
                ...state,
                isInProgress,
            }}>
            <BudgetActionContext.Provider
                value={{
                    getBudgetsForUser,
                    addBudget,
                    deleteBudget,
                    getBudgetsAndSpendingForUser,
                }}>
                {children}
            </BudgetActionContext.Provider>
        </BudgetStateContext.Provider>
    );
}

const useStateContext = () => {
    const context = useContext(BudgetStateContext);

    if (context == undefined) {
        throw new Error('useTransactionState must be used within a TransactionProvider');
    }
    return context;
}

const useActionsContext = () => {
    const context = useContext(BudgetActionContext);

    if (context == undefined) {
        throw new Error('useTransactionActions must be used within a TransactionProvider');
    }
    return context;
}

const useTransaction = () => {
    return { ...useStateContext(), ...useActionsContext() };
};

export { useTransaction, BudgetProvider };