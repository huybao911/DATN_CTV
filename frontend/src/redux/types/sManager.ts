import types from "redux/actions/types";
import { IUser } from "./user";
import { IManager } from "./Manager";
import { IRole } from "./role";
import { IDepartment } from "./department";
import { IEvent } from "./event";
import { IJobEvent } from "./jobEvent";

export interface ISManager {
  _id: any;
  username: string;
  password: string | null;
  role: any;
}

interface ISManagerLoaded {
  type: typeof types.SMANAGER_LOADED;
  payload: { getRole: IRole; smanager: ISManager };
}

interface ISManagerRegisterSuccess {
  type: typeof types.SMANAGER_REGISTER_SUCCESS;
  payload: { token: string; smanager: ISManager };
}

interface ISManagerLoginSuccess {
  type: typeof types.SMANAGER_LOGIN_SUCCESS;
  payload: { token: string; smanager: ISManager };
}

interface IGetUsers {
  type: typeof types.GET_USERS;
  payload: IUser[];
}

interface IGetUser {
  type: typeof types.GET_USER;
  payload: IUser[];
}

interface IGetDepartments {
  type: typeof types.GET_DEPARTMENTS;
  payload: IDepartment[];
}

interface IGetEvent {
  type: typeof types.GET_EVENTS;
  payload: IEvent[];
}

interface IGetEventApprove {
  type: typeof types.GET_EVENTAPPROVE_SMANAGER;
  payload: IEvent[];
}

interface IApproveEvent {
  type: typeof types.APPROVE_POSTER;
  payload: {
    event: IEvent;
    id: number;
  };
}

interface ICommentEvent {
  type: typeof types.COMMENT_EVENT;
  payload: {
    event: IEvent;
    id: number;
  };
}

interface IDeleteComment {
  type: typeof types.DELETE_COMMENT;
   payload: {
    event: IEvent;
    id: number;
  };
}

interface ISManagerRegisterFail {
  type: typeof types.SMANAGER_REGISTER_FAIL;
}

interface ISManagerLoginFail {
  type: typeof types.SMANAGER_LOGIN_FAIL;
}

interface ISManagerAuthError {
  type: typeof types.SMANAGER_AUTH_ERROR;
}

interface ISManagerLogout {
  type: typeof types.SMANAGER_LOGOUT;
}

export type SManagerActions =
  | ISManagerLoaded
  | ISManagerLoginSuccess
  | ISManagerRegisterSuccess
  | ISManagerRegisterFail
  | ISManagerLoginFail
  | ISManagerAuthError
  | ISManagerLogout
  | IGetUser
  | IGetUsers
  | IGetDepartments
  | IGetEvent
  | IGetEventApprove
  | IApproveEvent
  | ICommentEvent
  | IDeleteComment;

export type SManagerAdminActions =
| ISManagerRegisterSuccess
| ISManagerRegisterFail;

export interface ISManagerState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  smanager: ISManager;
  departments: IDepartment[];
  getRole: IRole;
  getDepartment: IDepartment;
  manager: IManager[];
  users: IUser[];
  events: IEvent[];
  jobevents: IJobEvent[];
}
