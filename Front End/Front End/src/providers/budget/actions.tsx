import {createAction} from "redux-actions";
import { IAddBudget, IBudget, IBudgetStateContext } from "./context";

export enum BudgetActions {
    GET_ALL_BUDGETS_FOR_USER = "GET_ALL_BUDGETS_FOR_USER",
    ADD_BUDGET = "ADD_BUDGET",
    DELETE_BUDGET = "DELETE_BUDGET",
}

export const getAllBudgetsForUserAction = createAction<IBudgetStateContext, IBudget[]>(
    BudgetActions.GET_ALL_BUDGETS_FOR_USER,
    (budgets) => ({budgets})
)

export const addBudgetAction = createAction(
    BudgetActions.ADD_BUDGET,
    (budget: IAddBudget) => budget
)

export const deleteBudgetAction = createAction(
    BudgetActions.DELETE_BUDGET,
    (budgetId: string) => budgetId
)