import { createStore, combineReducers } from "redux";
import  userReducer  from "../redux/reducers/userReducer";

const rootReducer = combineReducers({ userReducer });

 const store = createStore(rootReducer);

 export default store;





