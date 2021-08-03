import {combineReducers, createStore, applyMiddleware} from "redux";
import promise from "redux-promise-middleware";

import userReducer from "./reducers/userReducer";
import searchReducer from "./reducers/searchReducer";

const root = combineReducers({
    userReducer,
    searchReducer
});

export default createStore(root, applyMiddleware(promise))