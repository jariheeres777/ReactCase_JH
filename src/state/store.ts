import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducers } from './reducers/root.reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { rootEpics } from './epics/root.epics';

const epicMiddleware = createEpicMiddleware();

const middleware = [epicMiddleware, logger]

export function configure(): any {
  // Setting serialize to true results in errors being inspectable in Redux devtools
  const composeEnhancers = composeWithDevTools({ serialize: true });
  const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(...middleware))
  );
  epicMiddleware.run(rootEpics);
  middleware.push(logger);

  return store;
}
