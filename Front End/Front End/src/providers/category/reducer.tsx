import { CategoryActions } from "./actions";
import { ICategoryStateContext } from "./context";

export function categoryReducer(state: ICategoryStateContext, action: ReduxActions.Action<ICategoryStateContext>) {
    const { type, payload } = action;

    switch (type) {
        case CategoryActions.GET_ALL_EXPENSE_CATEGORIES:
            return {
                ...state,
                ...payload
            }
        case CategoryActions.GET_ALL_INCOME_CATEGORIES:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}