import {createAction} from "redux-actions";
import { ICreateTransaction, IDeleteTransaction, ITransaction, ITransactionStateContext } from "./context";

export enum TransactionActions {
    GET_ALL_EXPENSES_FOR_USER = "GET_ALL_EXPENSES_FOR_USER",
    GET_ALL_INCOME_FOR_USER = "GET_ALL_INCOME_FOR_USER",
    CREATE_TRANSACTION = "CREATE_TRANSACTION",
    DELETE_TRANSACTION = "DELETE_TRANSACTION",
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