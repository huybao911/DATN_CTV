import types from "redux/actions/types";
import { IUser } from "redux/types/user";
import { IManager } from "redux/types/Manager";
import { ISManager } from "redux/types/sManager";
import { ISManagerState, SManagerActions } from "../types/sManager";
import { IRole } from "redux/types/role";
import { IDepartment } from "redux/types/department";
import { IEvent } from "redux/types/event";
import { IJobEvent } from "redux/types/jobEvent";

const initialState: ISManagerState = {
  token: localStorage.getItem("SManager__token"),
  loading: true,
  isAuthenticated: null,
  smanager: {} as ISManager,
  manager: [] as IManager[],
  users: [] as IUser[],
  departments: [] as IDepartment[],
  events: [] as IEvent[],
  jobevents: [] as IJobEvent[],
  getRole: {} as IRole,
  getDepartment: {} as IDepartment,
};

const sManagerReducer = (
  state = initialState,
  action: SManagerActions
): ISManagerState => {
  switch (action.type) {
    case types.SMANAGER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.SMANAGER_LOGIN_SUCCESS:
      localStorage.setItem("SManager__token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.SMANAGER_REGISTER_SUCCESS:
      localStorage.setItem("SManager__token", action.payload.token);
      localStorage.removeItem("SManager__token");
      return {
        ...state,
        ...action.payload,
      };
    case types.GET_USER:
      return {
        ...state,
        users: action.payload,
      };
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
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

    case types.GET_EVENTAPPROVE_SMANAGER:
      return {
        ...state,
        events: action.payload,
      };
    case types.APPROVE_POSTER:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.event } : event
        ),
      };
    case types.COMMENT_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.event } : event
        ),
      };
    case types.DELETE_COMMENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.event } : event
        ),
      };

    case types.SMANAGER_LOGIN_FAIL:
    case types.SMANAGER_REGISTER_FAIL:
    case types.SMANAGER_AUTH_ERROR:
    case types.SMANAGER_LOGOUT:
      localStorage.removeItem("SManager__token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        smanager: {} as ISManager,
        users: [],
      };

    default:
      return state;
  }
};

export default sManagerReducer;
