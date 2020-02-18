import { createStore, combineReducers, applyMiddleware, compose  } from "redux";
import createSagaMiddleware from 'redux-saga'
import auth from "./reducers/auth";
import users from "./reducers/users";
import { watchUsers } from './sagas'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({auth, users})

const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(sagaMiddleware)
))
sagaMiddleware.run(watchUsers)
export default store;