import {applyMiddleware, legacy_createStore as createStore} from 'redux'
import {reducer} from "./reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";


 export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))