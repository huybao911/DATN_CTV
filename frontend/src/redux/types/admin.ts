import types from "redux/actions/types";
import { IUser } from "./user";
import { ISManager } from "./sManager";
import { IManager } from "./Manager";
import { IDepartment } from "./department";
import { IRole } from "./role";
import { IEvent } from "./event";
import { IJobEvent } from "./jobEvent";

export interface IAdmin {
  _id: any;
  username: string;
  password: string | null;
  role: any;
}

interface IAdminLoaded {
  type: typeof types.ADMIN_LOADED;
  payload: { getRole: IRole; admin: IAdmin };
}

interface IAdminRegisterSuccess {
  type: typeof types.ADMIN_REGISTER_SUCCESS;
  payload: { token: string; admin: IAdmin };
}

interface IAdminLoginSuccess {
  type: typeof types.ADMIN_LOGIN_SUCCESS;
  payload: { token: string; admin: IAdmin };
}

interface IAdminAddDepartmentSuccess {
  type: typeof types.ADMIN_ADDDEPARTMENT_SUCCESS;
  payload: {
    name: IDepartment;
    id: number;
  };
}

interface IUpdateDepartment {
  type: typeof types.UPDATE_DEPARTMENT;
  payload: {
    department: IDepartment;
    id: number;
  };
}

interface IDeleteDepartment {
  type: typeof types.DELETE_DEPARTMENT;
  payload: number;
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

interface IGetEvents {
  type: typeof types.GET_EVENTS;
  payload: IEvent[];
}

interface IGetJobEvents {
  type: typeof types.GET_JOBEVENTS;
  payload: IJobEvent[];
}

interface IGetRoles {
  type: typeof types.GET_ROLES;
  payload: IRole[];
}

interface IUpdateUser {
  type: typeof types.UPDATE_USER;
  payload: {
    user: IUser;
    id: number;
  };
}

interface IDeleteUser {
  type: typeof types.DELETE_USER;
  payload: number;
}

interface IAdminAddDepartmentFail {
  type: typeof types.ADMIN_ADDDEPARTMENT_FAIL;
}

interface IAdminRegisterFail {
  type: typeof types.ADMIN_REGISTER_FAIL;
}

interface IAdminLoginFail {
  type: typeof types.ADMIN_LOGIN_FAIL;
}

interface IAdminAuthError {
  type: typeof types.ADMIN_AUTH_ERROR;
}

interface IAdminLogout {
  type: typeof types.ADMIN_LOGOUT;
}

export type AdminActions =
  | IAdminLoaded
  | IAdminLoginSuccess
  | IAdminRegisterSuccess
  | IAdminRegisterFail
  | IAdminLoginFail
  | IAdminAddDepartmentSuccess
  | IAdminAddDepartmentFail
  | IAdminAuthError
  | IAdminLogout
  | IGetUsers
  | IGetUser
  | IGetDepartments
  | IUpdateDepartment
  | IDeleteDepartment
  | IGetRoles
  | IGetEvents
  | IGetJobEvents
  | IUpdateUser
  | IDeleteUser;

export interface IAdminState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  admin: IAdmin;
  getRole: IRole;
  smanager: ISManager[];
  manager: IManager[];
  users: IUser[];
  roles: IRole[];
  departments: IDepartment[];
  events: IEvent[];
  jobevents: IJobEvent[];
}
