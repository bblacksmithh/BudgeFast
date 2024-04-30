import {createAction} from "redux-actions";
import { ICategory, ICategoryStateContext } from "./context";

export enum CategoryActions {
    GET_ALL_EXPENSE_CATEGORIES = "GET_ALL_EXPENSE_CATEGORIES",
    GET_ALL_INCOME_CATEGORIES = "GET_ALL_INCOME_CATEGORIES",
}

export const getAllExpenseCategoriesAction = createAction<ICategoryStateContext, ICategory[]>(
    CategoryActions.GET_ALL_EXPENSE_CATEGORIES,
    (allExpenseCategories) => ({allExpenseCategories})
)

export const getAllIncomeCategoriesAction = createAction<ICategoryStateContext, ICategory[]>(
    CategoryActions.GET_ALL_INCOME_CATEGORIES,
    (allIncomeCategories) => ({allIncomeCategories})
)