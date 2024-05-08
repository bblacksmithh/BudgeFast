import { createContext } from "react";

export interface IStatement {
    forUser: string,
    monthOf: Date,
    openingBalance: number,
    netChange: number,
    closingBalance: number,
    transactions: [
        {
            description: string,
            amount: number,
            category: string,
            accountName: string,
            isExpense: boolean,
            transactionDate: Date,
            id: string,
        }
    ],
    id: string,
}

export interface IForecast {
    forecastedValue: number,
    label: string,
    date: Date,
}

export interface IStatementStateContext {
    entireForecast?: IForecast[],
    allStatements?: IStatement[],
    isInProgress?: any,
    error?: any,
    isSuccess?: boolean
}

export interface IStatementActionContext {
    getAllStatementsForUser: () => Promise<IStatement[]>
    forecastNetWorth: () => Promise<IForecast[]>
}

export const STATEMENT_CONTEXT_INITIAL_STATE: IStatementStateContext = {};

export const StatementStateContext = createContext<IStatementStateContext>(STATEMENT_CONTEXT_INITIAL_STATE);
export const StatementActionContext = createContext<IStatementActionContext>({} as any);