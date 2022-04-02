import { combineReducers } from "redux";
import { SecurityReducer } from "./security/Security.reducer";

export const rootReducer = combineReducers({
  security: SecurityReducer,
});
