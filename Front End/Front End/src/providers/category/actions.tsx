import {createAction} from "redux-actions";
import { ICategory, ICategoryStateContext, IExpensesPerCategory } from "./context";

export enum CategoryActions {
    GET_ALL_EXPENSE_CATEGORIES = "GET_ALL_EXPENSE_CATEGORIES",
    GET_ALL_INCOME_CATEGORIES = "GET_ALL_INCOME_CATEGORIES",
    GET_ALL_EXPENSES_PER_CATEGORY = "GET_ALL_EXPENSES_PER_CATEGORY",

}

export const getAllExpenseCategoriesAction = createAction<ICategoryStateContext, ICategory[]>(
    CategoryActions.GET_ALL_EXPENSE_CATEGORIES,
    (allExpenseCategories) => ({allExpenseCategories})
)

export const getAllIncomeCategoriesAction = createAction<ICategoryStateContext, ICategory[]>(
    CategoryActions.GET_ALL_INCOME_CATEGORIES,
    (allIncomeCategories) => ({allIncomeCategories})
)

export const getAllExpensesPerCategoryAction = createAction<ICategoryStateContext, IExpensesPerCategory[]>(
    CategoryActions.GET_ALL_EXPENSES_PER_CATEGORY,
    (expensesPerCategory) => ({expensesPerCategory})
)