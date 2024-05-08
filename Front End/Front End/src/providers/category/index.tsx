"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import axios from "axios";
import { categoryReducer } from "./reducer";
import { CATEGORY_CONTEXT_INITIAL_STATE, CategoryActionContext, CategoryStateContext, ICategory, IExpensesPerCategory } from "./context";
import { getAllExpenseCategoriesAction, getAllExpensesPerCategoryAction, getAllIncomeCategoriesAction } from "./actions";

const CategoryProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(categoryReducer, CATEGORY_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);

    const getAllIncomeCategories = (): Promise<ICategory[]> =>
        new Promise((resolve, reject) => {
            {
                axios.get('https://localhost:44311/api/services/app/TransactionCategory/GetAllIncomeCategories')
                    .then((response) => {
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

    const currentDate = new Date;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const getAllExpensesPerCategory = (): Promise<IExpensesPerCategory[]> =>
        new Promise((resolve, reject) => {
            {
                axios.get(`https://localhost:44311/api/services/app/TransactionCategory/GetTotalExpensesPerCategoryPerMonth?UserId=${localStorage.getItem('userId')}&MonthOf=${year + "-" + month}`)
                    .then((response) => {
                        dispatch(getAllExpensesPerCategoryAction(response.data.result));
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
                    getAllExpensesPerCategory
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