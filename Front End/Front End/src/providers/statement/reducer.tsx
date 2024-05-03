import { IStatementStateContext } from "./context";
import { StatementActions } from "./actions";

export function statementReducer(state: IStatementStateContext, action: ReduxActions.Action<IStatementStateContext>) {
    const { type, payload } = action;

    switch (type) {
        case StatementActions.GET_ALL_STATEMENTS_FOR_USER:
            return {
                ...state,
                ...payload
            }
        default: 
            return state;
    }
}