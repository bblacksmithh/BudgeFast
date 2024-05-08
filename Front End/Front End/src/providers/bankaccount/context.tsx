import {createContext} from 'react';

export interface IBankAccount {
    accountName: string,
    accountType: string,
    balance: number,
    id: string,
}

export interface ICreateBankAccount {
    userId: number,
    accountName: string,
    accountType: string,
    balance: number,
}

export interface IBankAccountStateContext {
    allAccounts?: IBankAccount[],
    isInProgress?: any,
    error?: any,
}

export interface IBankAccountActionContext {
    getAllBankAccountsForUser: () => Promise<IBankAccount[]>,
    createBankAccount: (createBankAccount: ICreateBankAccount) => Promise<void>,
}

export const BANK_ACCOUNT_CONTEXT_INITIAL_STATE: IBankAccountStateContext = {};

export const BankAccountStateContext = createContext<IBankAccountStateContext>(BANK_ACCOUNT_CONTEXT_INITIAL_STATE);
export const BankAccountActionContext = createContext<IBankAccountActionContext>({} as any);