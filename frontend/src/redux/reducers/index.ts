import { combineReducers } from "redux";
import admin from "./admin";
import smanager from "./sManager";
import manager from "./Manager";
import user from "./user";

import alert from "./alert";

const rootReducer = combineReducers({
  admin,
  smanager,
  manager,
  user,
  alert,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
