"use client"

import React, { FC, PropsWithChildren, useContext, useReducer, useState } from "react";
import axios from "axios";
import { bankAccountReducer } from "./reducer";
import { BANK_ACCOUNT_CONTEXT_INITIAL_STATE, BankAccountActionContext, BankAccountStateContext, IBankAccount, ICreateBankAccount } from "./context";
import { getAllBankAccountsForUserAction } from "./actions";

const BankAccountProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(bankAccountReducer, BANK_ACCOUNT_CONTEXT_INITIAL_STATE);
    const [isInProgress, setIsInProgress] = useState(false);

    const getAllBankAccountsForUser = (): Promise<IBankAccount[]> =>
        new Promise((resolve, reject) => {
            {
                axios.get(`https://localhost:44311/api/services/app/BankAccount/GetAllBankAccountsByUserId?input=${localStorage.getItem('userId')}`)
                    .then((response) => {
                        console.log(response.data.result)
                        dispatch(getAllBankAccountsForUserAction(response.data.result));
                        setIsInProgress(false);
                        resolve(response.data);
                    })
                    .catch(e => {
                        setIsInProgress(false);
                        reject(e.message);
                    })
            }
        });

    const createBankAccount = (createBankAccount: ICreateBankAccount) =>
        new Promise<void>((resolve, reject) => {
            setIsInProgress(true);
            axios.post('https://localhost:44311/api/services/app/BankAccount/CreateBankAccount', createBankAccount)
                .then((response) => {
                    // dispatch(createTransactionAction(response.data));
                    axios.get(`https://localhost:44311/api/services/app/BankAccount/GetAllBankAccountsByUserId?input=${localStorage.getItem('userId')}`)
                    .then((allAccountResponse) => {
                        dispatch(getAllBankAccountsForUserAction(allAccountResponse.data.result));
                        // resolve(expenseResult.data);
                    })
                    .catch (e => {
                        setIsInProgress(false);
                        reject(e.message);
                    })
                    setIsInProgress(false);
                    resolve(response.data);
                })
                .catch(e => {
                    setIsInProgress(false);
                    reject(e.message);
                })
        });

    return (
        <BankAccountStateContext.Provider
            value={{
                ...state,
                isInProgress,
            }}>
            <BankAccountActionContext.Provider
                value={{
                    getAllBankAccountsForUser,
                    createBankAccount
                }}>
                {children}
            </BankAccountActionContext.Provider>
        </BankAccountStateContext.Provider>
    );
}

const useStateContext = () => {
    const context = useContext(BankAccountStateContext);

    if (context == undefined) {
        throw new Error('useBankAccount must be used within a BankAccountProvider');
    }
    return context;
}

const useActionsContext = () => {
    const context = useContext(BankAccountActionContext);

    if (context == undefined) {
        throw new Error('useBankAccountActions must be used within a BankAccountProvider');
    }
    return context;
}

const useBankAccount = () => {
    return { ...useStateContext(), ...useActionsContext() };
};

export { useBankAccount, BankAccountProvider };