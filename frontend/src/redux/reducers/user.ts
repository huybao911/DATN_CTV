import types from "redux/actions/types";
import { IUserState, UserActions } from "../types/user";
import { IUser } from "redux/types/user";
import { IRole } from "redux/types/role";
import { IDepartment } from "redux/types/department";
import { IEvent } from "redux/types/event";
import { IJobEvent } from "redux/types/jobEvent";

const initialState: IUserState = {
  token: localStorage.getItem("user__token"),
  loading: true,
  isAuthenticated: null,
  user: {} as IUser,
  getRole: {} as IRole,
  getDepartment: {} as IDepartment,
  users: [] as IUser[],
  events: [] as IEvent[],
  jobs: [] as IJobEvent[],
  departments: [] as IDepartment[],
};

const userReducer = (state = initialState, action: UserActions): IUserState => {
  switch (action.type) {
    case types.USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.USER_REGISTER_SUCCESS:
      localStorage.setItem("user__token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.USER_LOGIN_SUCCESS:
      localStorage.setItem("user__token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    case types.GET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case types.GET_STORAGER:
      return {
        ...state,
        events: action.payload,
      };
    case types.CREATE_STORAGER:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.event } : event
        ),
      };
    case types.DELETE_STORAGER:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.event } : event
        ),
      };
    case types.GET_JOB_USER_APPLY:
      return {
        ...state,
        events: action.payload,
      };
    case types.USER_APPLY_JOB:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.event } : event
        ),
      };
    case types.USER_UNAPPLY_JOB:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.event } : event
        ),
      };
    case types.GET_PROFILE:
      return {
        ...state,
        users: action.payload,
      };
    case types.UPDATE_PROFILE:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.id ? { ...action.payload.user } : user
        ),
      };

    case types.USER_REGISTER_FAIL:
    case types.USER_LOGIN_FAIL:
    case types.USER_AUTH_ERROR:
    case types.USER_LOGOUT:
      localStorage.removeItem("user__token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {} as IUser,
      };

    default:
      return state;
  }
};

export default userReducer;
