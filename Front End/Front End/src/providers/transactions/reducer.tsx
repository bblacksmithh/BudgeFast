import { TransactionActions } from "./actions";
import { ICreateTransaction, ITransaction, ITransactionStateContext } from "./context";

export function transactionReducer(state: ITransactionStateContext, action: ReduxActions.Action<ITransactionStateContext>) {
    const { type, payload } = action;

    switch (type) {
        case TransactionActions.GET_ALL_EXPENSES_FOR_USER:
            return {
                ...state,
                ...payload
            }
        case TransactionActions.GET_ALL_INCOME_FOR_USER:
            return {
                ...state,
                ...payload
            }
        case TransactionActions.CREATE_TRANSACTION:
            return state;
        default:
            return state;
    }
}