import {combineEpics} from "redux-observable";
import listEpics from "./list.epics";
import todoEpics from "./Todo.epics";
import tagsEpics from './Tag.epics'
import commentsEpics from "./Comments.epics"

export const rootEpics: any = combineEpics(
    ...listEpics,
    ...todoEpics,
    ...tagsEpics,
    ...commentsEpics
);