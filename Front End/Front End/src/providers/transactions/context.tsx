import {createContext} from 'react';

export interface ITransaction {
    accountName: string,
    transactionCategory: string,
    amount: number,
    description: string,
    transactionDate: Date,
    id: string,
}

export interface IAllExpenses {
    result: ITransaction[]
}

export interface IAllIncome {
    result: ITransaction[]
}

export interface ICreateTransaction {
    userId: number,
    bankAccountId: string,
    transactionCategoryId: string,
    amount: number,
    description: string,
    transactionDate: Date,
    isExpense: boolean
}

export interface ITransactionStateContext {
    allExpenses?: ITransaction[],
    allIncome?: ITransaction[],
    isInProgress?: any,
    error?: any,
    isSuccess?: boolean
}

export interface ITransactionActionContext {
    getAllExpensesForUser: () => Promise<ITransaction[]>,
    getAllIncomeForUser: () => Promise<ITransaction[]>,
    createTransaction: (createTransaction: ICreateTransaction) => Promise<void>,
}

export const TRANSACTION_CONTEXT_INITIAL_STATE: ITransactionStateContext = {};

export const TransactionStateContext = createContext<ITransactionStateContext>(TRANSACTION_CONTEXT_INITIAL_STATE);
export const TransactionActionContext = createContext<ITransactionActionContext>({} as any);