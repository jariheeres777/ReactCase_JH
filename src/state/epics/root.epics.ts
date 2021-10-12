import {combineEpics} from "redux-observable";
import listEpics from "./list.epics";
import todoEpics from "./Todo.epics";
import tagsEpics from './Tag.epics'

export const rootEpics: any = combineEpics(
    ...listEpics,
    ...todoEpics,
    ...tagsEpics
);