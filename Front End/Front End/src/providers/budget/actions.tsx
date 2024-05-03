import {createAction} from "redux-actions";
import { IStatement, IStatementStateContext } from "./context";

export enum StatementActions {
    GET_ALL_STATEMENTS_FOR_USER = "GET_ALL_STATEMENTS_FOR_USER",
}

export const getAllStatementsForUserAction = createAction<IStatementStateContext, IStatement[]>(
    StatementActions.GET_ALL_STATEMENTS_FOR_USER,
    (allStatements) => ({allStatements})
)