import { combineEpics } from "redux-observable";
import listEpics from "./list.epics";

export const rootEpics: any = combineEpics(
  ...listEpics
);