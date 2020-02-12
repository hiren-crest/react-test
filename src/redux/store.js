import { createStore, combineReducers } from "redux";
import auth from "./reducers/auth";

const reducer = combineReducers({auth})
export default createStore(reducer);