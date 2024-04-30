"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import axios from "axios";
import { categoryReducer } from "./reducer";
import { CATEGORY_CONTEXT_INITIAL_STATE, CategoryActionContext, CategoryStateContext, ICategory } from "./context";
import { getAllExpenseCategoriesAction, getAllIncomeCategoriesAction } from "./actions";

const CategoryProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(categoryReducer, CATEGORY_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);

    const getAllIncomeCategories = (): Promise<ICategory[]> =>
        new Promise((resolve, reject) => {
            {
                axios.get('https://localhost:44311/api/services/app/TransactionCategory/GetAllIncomeCategories')
                    .then((response) => {
                        console.log(response.data.result)
                        dispatch(getAllIncomeCategoriesAction(response.data.result));
                        setIsInProgress(false);
                        resolve(response.data);
                    })
                    .catch(e => {
                        setIsInProgress(false);
                        reject(e.message);
                    })
            }
        });
    
        const getAllExpenseCategories = (): Promise<ICategory[]> =>
            new Promise((resolve, reject) => {
                {
                    axios.get('https://localhost:44311/api/services/app/TransactionCategory/GetAllExpenseCategories')
                        .then((response) => {
                            console.log(response.data.result)
                            dispatch(getAllExpenseCategoriesAction(response.data.result));
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
        <CategoryStateContext.Provider
            value={{
                ...state,
                isInProgress,
            }}>
            <CategoryActionContext.Provider
                value={{
                    getAllExpenseCategories,
                    getAllIncomeCategories,
                }}>
                {children}
            </CategoryActionContext.Provider>
        </CategoryStateContext.Provider>
    );
}

const useStateContext = () => {
    const context = useContext(CategoryStateContext);

    if (context == undefined) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
}

const useActionsContext = () => {
    const context = useContext(CategoryActionContext);

    if (context == undefined) {
        throw new Error('useCategoryActions must be used within a CategoryProvider');
    }
    return context;
}

const useCategory = () => {
    return { ...useStateContext(), ...useActionsContext() };
};

export { useCategory, CategoryProvider };