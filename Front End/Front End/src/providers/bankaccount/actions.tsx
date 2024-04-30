import {createAction} from "redux-actions";
import { IBankAccount, IBankAccountStateContext, ICreateBankAccount } from "./context";

export enum BankAccountActions {
    GET_ALL_BANK_ACCOUNTS_FOR_USER = "GET_ALL_BANK_ACCOUNTS_FOR_USER",
    CREATE_BANK_ACCOUNT = "CREATE_BANK_ACCOUNT",
}

export const getAllBankAccountsForUserAction = createAction<IBankAccountStateContext, IBankAccount[]>(
    BankAccountActions.GET_ALL_BANK_ACCOUNTS_FOR_USER,
    (allAccounts) => ({allAccounts})
)

export const createBankAccountAction = createAction(
    BankAccountActions.CREATE_BANK_ACCOUNT,
    (bankAccount: ICreateBankAccount) => bankAccount,
)