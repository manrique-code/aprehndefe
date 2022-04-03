import { combineReducers } from "redux";
import { SecurityReducer } from "./security/Security.reducer";
import { signUpReducer } from "./security/Signin.reducer";

export const rootReducer = combineReducers({
  security: SecurityReducer,
  signup: signUpReducer,
});
