import {createContext} from 'react';

export interface ICategory {
    categoryName: string,
    isExpense: string,
    id: string,
}

export interface IExpensesPerCategory {
    categoryName: string,
    amountSpent: number,
}

export interface ICategoryStateContext {
    allIncomeCategories?: ICategory[],
    allExpenseCategories?: ICategory[],
    expensesPerCategory?: IExpensesPerCategory[],
    isInProgress?: any,
    error?: any,
}

export interface ICategoryActionContext {
    getAllExpenseCategories: () => Promise<ICategory[]>,
    getAllIncomeCategories: () => Promise<ICategory[]>,
    getAllExpensesPerCategory: () => Promise<IExpensesPerCategory[]>
}

export const CATEGORY_CONTEXT_INITIAL_STATE: ICategoryStateContext = {};

export const CategoryStateContext = createContext<ICategoryStateContext>(CATEGORY_CONTEXT_INITIAL_STATE);
export const CategoryActionContext = createContext<ICategoryActionContext>({} as any);