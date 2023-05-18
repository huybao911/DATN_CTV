import { IAdminState, AdminActions } from "./admin";
import { ISManagerState, SManagerActions } from "./sManager";
import { IManagerState, ManagerActions } from "./Manager";
import { IUserState, UserActions } from "./user";
import { IAlertState, AlertActions } from "./alert";

export type AppState = IAdminState | IUserState | ISManagerState | IManagerState | IAlertState;
export type AppActions = AdminActions | UserActions | SManagerActions | ManagerActions | AlertActions;
 