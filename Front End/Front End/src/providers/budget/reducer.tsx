import { IBudgetStateContext } from "./context";
import { BudgetActions } from "./actions";

export function budgetReducer(state: IBudgetStateContext, action: ReduxActions.Action<IBudgetStateContext>) {
    const { type, payload } = action;

    switch (type) {
        case BudgetActions.GET_ALL_BUDGETS_FOR_USER:
            return {
                ...state,
                ...payload
            }
        case BudgetActions.ADD_BUDGET:
            return {
                ...state,
                ...payload,
            }
        case BudgetActions.DELETE_BUDGET:
            return {
                ...state,
                ...payload,
            }
        default: 
            return state;
    }
}