import {combineEpics} from "redux-observable";
import listEpics from "./list.epics";
import todoEpics from "./Todo.epics";

export const rootEpics: any = combineEpics(
    ...listEpics,
    ...todoEpics
);