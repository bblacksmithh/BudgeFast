import { BankAccountActions } from "./actions";
import { IBankAccountStateContext } from "./context";

export function bankAccountReducer(state: IBankAccountStateContext, action: ReduxActions.Action<IBankAccountStateContext>) {
    const { type, payload } = action;

    switch (type) {
        case BankAccountActions.GET_ALL_BANK_ACCOUNTS_FOR_USER:
            return {
                ...state,
                ...payload
            }
        case BankAccountActions.CREATE_BANK_ACCOUNT:
            return state;
        default:
            return state;
    }
}