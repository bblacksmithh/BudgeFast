import {createAction} from "redux-actions";
import { ICreateTransaction, IDeleteTransaction, IIncomeVsExpenses, ITransaction, ITransactionStateContext } from "./context";

export enum TransactionActions {
    GET_ALL_EXPENSES_FOR_USER = "GET_ALL_EXPENSES_FOR_USER",
    GET_ALL_INCOME_FOR_USER = "GET_ALL_INCOME_FOR_USER",
    CREATE_TRANSACTION = "CREATE_TRANSACTION",
    DELETE_TRANSACTION = "DELETE_TRANSACTION",
    GET_INCOME_VS_EXPENSES = "GET_INCOME_VS_EXPENSES" 
}

export const getAllExpensesForUserAction = createAction<ITransactionStateContext, ITransaction[]>(
    TransactionActions.GET_ALL_EXPENSES_FOR_USER,
    (allExpenses) => ({allExpenses})
)

export const getAllIncomeForUserAction = createAction<ITransactionStateContext, ITransaction[]>(
    TransactionActions.GET_ALL_INCOME_FOR_USER,
    (allIncome) => ({allIncome})
)

export const createTransactionAction = createAction(
    TransactionActions.CREATE_TRANSACTION,
    (transaction: ICreateTransaction) => transaction,
)

export const deleteTransactionAction = createAction(
    TransactionActions.CREATE_TRANSACTION,
    (transactionId: IDeleteTransaction) => transactionId,
)

export const getIncomeVsExpensesAction = createAction<ITransactionStateContext, IIncomeVsExpenses[]>(
    TransactionActions.GET_INCOME_VS_EXPENSES,
    (sixMonthIncomeVsExpenses) => ({sixMonthIncomeVsExpenses}),
)