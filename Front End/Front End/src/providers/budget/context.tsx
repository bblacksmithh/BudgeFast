import { createContext } from "react";

export interface IBudget {
    category: string,
    amount: number,
    id: string,
}

export interface IAddBudget {
    userId: number,
    categoryId: string,
    amount: number,
}

export interface IBudgetStateContext {
    budgets?: IBudget[],
    budgetsAndSpending?: IBudget[],
    isInProgress?: any,
    error?: any,
    isSuccess?: boolean
}

export interface IBudgetActionContext {
    getBudgetsForUser: () => Promise<IBudget[]>
    getBudgetsAndSpendingForUser: () => Promise<IBudget[]>
    addBudget: (budget: IAddBudget) => Promise<void>
    deleteBudget: (budgetId: string) => Promise<void>
}

export const BUDGET_CONTEXT_INITIAL_STATE: IBudgetStateContext = {};

export const BudgetStateContext = createContext<IBudgetStateContext>(BUDGET_CONTEXT_INITIAL_STATE);
export const BudgetActionContext = createContext<IBudgetActionContext>({} as any);