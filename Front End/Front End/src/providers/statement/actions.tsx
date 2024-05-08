import {createAction} from "redux-actions";
import { IForecast, IStatement, IStatementStateContext } from "./context";

export enum StatementActions {
    GET_ALL_STATEMENTS_FOR_USER = "GET_ALL_STATEMENTS_FOR_USER",
    FORECAST_NET_WORTH = "FORECAST_NET_WORTH",
}

export const getAllStatementsForUserAction = createAction<IStatementStateContext, IStatement[]>(
    StatementActions.GET_ALL_STATEMENTS_FOR_USER,
    (allStatements) => ({allStatements})
)

export const forecastNetWorthAction = createAction<IStatementStateContext, IForecast[]>(
    StatementActions.FORECAST_NET_WORTH,
    (entireForecast) => ({entireForecast})
)