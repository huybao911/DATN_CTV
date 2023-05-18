import types from "redux/actions/types";
import { IUser } from "./user";
import { IRole } from "./role";
import { IDepartment } from "./department";
import { IEvent } from "./event";
import { IJobEvent } from "./jobEvent";

export interface IManager {
  _id: any;
  username: string;
  password: string | null;
  role: any;
}

interface IManagerLoaded {
  type: typeof types.MANAGER_LOADED;
  payload: { getRole: IRole; manager: IManager };
}

interface IManagerRegisterSuccess {
  type: typeof types.MANAGER_REGISTER_SUCCESS;
  payload: { token: string; manager: IManager };
}

interface IManagerLoginSuccess {
  type: typeof types.MANAGER_LOGIN_SUCCESS;
  payload: { token: string; manager: IManager };
}

interface IGetUsers {
  type: typeof types.GET_USERS;
  payload: IUser[];
}

interface IGetUser {
  type: typeof types.GET_USER;
  payload: IUser[];
}

interface IGetListUserApply {
  type: typeof types.GET_LIST_USERAPPLY;
  payload: IEvent[];
}

interface IGetListCTV {
  type: typeof types.GET_LIST_CTV;
  payload: IEvent[];
}

interface IUpdateCoefficient {
  type: typeof types.UPDATE_COEFFICIENT;
  payload: {
    event: IEvent;
    id: number;
  };
}

interface IApproveUserJobApply {
  type: typeof types.APPROVE_USER_APPLY_JOB;
  payload: {
    event: IEvent;
    id: number;
  };
}

interface IUnapproveUserJobApply {
  type: typeof types.UNAPPROVE_USER_APPLY_JOB;
  payload: {
    event: IEvent;
    id: number;
  };
}

interface IAcceptCTV {
  type: typeof types.ACCEPT_CTV;
  payload: {
    event: IEvent;
    id: number;
  };
}

interface IUnAcceptCTV {
  type: typeof types.UNACCEPT_CTV;
  payload: {
    event: IEvent;
    id: number;
  };
}

interface IGetEvents {
  type: typeof types.GET_EVENTS;
  payload: IEvent[];
}

interface ICreateEventSuccess {
  type: typeof types.CREATE_EVENT_SUCCESS;
  payload: IEvent[];
}

interface IUpdateEvent {
  type: typeof types.UPDATE_EVENT;
  payload: {
    event: IEvent;
    id: number;
  };
}

interface IDeleteEvent {
  type: typeof types.DELETE_EVENT;
  payload: number;
}

interface IGetJobEvents {
  type: typeof types.GET_JOBEVENTS;
  payload: IJobEvent[];
}

interface ICreateJobEventSuccess {
  type: typeof types.CREATE_JOBEVENT_SUCCESS;
  payload: IJobEvent[];
}

interface IUpdateJobEvent {
  type: typeof types.UPDATE_JOBEVENT;
  payload: {
    jobEvent: IJobEvent;
    id: number;
  };
}

interface IDeleteJobEvent {
  type: typeof types.DELETE_JOBEVENT;
  payload: number;
}

interface ICreateEventFail {
  type: typeof types.CREATE_EVENT_FAIL;
}

interface ICreateJobEventFail {
  type: typeof types.CREATE_JOBEVENT_FAIL;
}

interface IManagerRegisterFail {
  type: typeof types.MANAGER_REGISTER_FAIL;
}

interface IManagerLoginFail {
  type: typeof types.MANAGER_LOGIN_FAIL;
}

interface IManagerAuthError {
  type: typeof types.MANAGER_AUTH_ERROR;
}

interface IManagerLogout {
  type: typeof types.MANAGER_LOGOUT;
}

export type ManagerActions =
  | IManagerLoaded
  | IManagerLoginSuccess
  | IManagerRegisterSuccess
  | IManagerRegisterFail
  | IManagerLoginFail
  | IManagerAuthError
  | IManagerLogout
  | IGetUsers
  | IGetUser
  | IGetListUserApply
  | IGetListCTV
  | IUpdateCoefficient
  | IApproveUserJobApply
  | IUnapproveUserJobApply
  | IAcceptCTV
  | IUnAcceptCTV
  | IGetEvents
  | ICreateEventSuccess
  | ICreateEventFail
  | IUpdateEvent
  | IDeleteEvent
  | IGetJobEvents
  | ICreateJobEventSuccess
  | ICreateJobEventFail
  | IUpdateJobEvent
  | IDeleteJobEvent;

export type ManagerAdminActions =
  | IManagerRegisterSuccess
  | IManagerRegisterFail;

export interface IManagerState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  getRole: IRole;
  getDepartment: IDepartment;
  manager: IManager;
  users: IUser[];
  events: IEvent[];
  jobevents: IJobEvent[];
}
