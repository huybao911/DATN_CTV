import types from "redux/actions/types";
import { IDepartment } from "./department";
import { IRole } from "./role";
import { IEvent } from "./event";
import { IJobEvent } from "./jobEvent";

export interface IUser {
  _id: any;
  username: string;
  email: string;
  password: string | null;
  department: any;
  avatar: string;
  role: any;
  date: string;
  fullName: string;
  birthday: string;
  mssv: string;
  classUser: string;
  phone: string;
  address: string;
  update: string;
  delete: string;
}

interface IUserLoaded {
  type: typeof types.USER_LOADED;
  payload: { getRole: IRole; user: IUser };
}

interface IUserRegisterSuccess {
  type: typeof types.USER_REGISTER_SUCCESS;
  payload: { token: string; user: IUser };
}

interface IUserLoginSuccess {
  type: typeof types.USER_LOGIN_SUCCESS;
  payload: { token: string; user: IUser };
}

interface IUserLoginFail {
  type: typeof types.USER_LOGIN_FAIL;
}

interface IGetEvents {
  type: typeof types.GET_EVENTS;
  payload: IEvent[];
}

interface IGetEventStorager {
  type: typeof types.GET_STORAGER;
  payload: IEvent[];
}

interface ICreateStorager {
  type: typeof types.CREATE_STORAGER;
  payload: {
    event: IEvent;
    id: number;
  };
}

interface IDeleteStorager {
  type: typeof types.DELETE_STORAGER;
   payload: {
    event: IEvent;
    id: number;
  };
}

interface IUserApplyJob {
  type: typeof types.USER_APPLY_JOB;
  payload: {
    event: IEvent;
    id: number;
  };
}

interface IUserUnApplyJob {
  type: typeof types.USER_UNAPPLY_JOB;
   payload: {
    event: IEvent;
    id: number;
  };
}

interface IGetJobUserApply {
  type: typeof types.GET_JOB_USER_APPLY;
  payload: IEvent[];
}

interface IGetProfile {
  type: typeof types.GET_PROFILE;
  payload: IUser[];
}
interface IUpdateProfile {
  type: typeof types.UPDATE_PROFILE;
  payload: {
    user: IUser;
    id: number;
  };
}
interface IGetDepartments {
  type: typeof types.GET_DEPARTMENTS;
  payload: IDepartment[];
}

interface IUserRegisterFail {
  type: typeof types.USER_REGISTER_FAIL;
}

interface IUserAuthError {
  type: typeof types.USER_AUTH_ERROR;
}

interface IUserLogout {
  type: typeof types.USER_LOGOUT;
}

export type UserActions =
  | IUserLoaded
  | IUserLoginSuccess
  | IUserLoginFail
  | IUserRegisterSuccess
  | IUserRegisterFail
  | IUserAuthError
  | IGetDepartments
  | IGetEvents
  | IGetEventStorager
  | ICreateStorager
  | IDeleteStorager
  | IGetJobUserApply
  | IUserApplyJob
  | IUserUnApplyJob
  | IGetProfile
  | IUpdateProfile
  | IUserLogout;

export interface IUserState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  user: IUser;
  getRole: IRole;
  getDepartment: IDepartment;
  departments: IDepartment[];
  events: IEvent[];
  jobs: IJobEvent[];
  users: IUser[];
}
