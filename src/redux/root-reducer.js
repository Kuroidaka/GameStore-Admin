import { combineReducers } from "redux";
import userReducer from "./reducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
