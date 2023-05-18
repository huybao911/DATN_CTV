import types from "redux/actions/types";
import { IUser } from "redux/types/user";
import { IManager } from "redux/types/Manager";
import { IManagerState, ManagerActions } from "../types/Manager";
import { IRole } from "redux/types/role";
import { IDepartment } from "redux/types/department";
import { IEvent } from "redux/types/event";
import { IJobEvent } from "redux/types/jobEvent";

const initialState: IManagerState = {
  token: localStorage.getItem("Manager__token"),
  loading: true,
  isAuthenticated: null,
  manager: {} as IManager,
  users: [] as IUser[],
  events: [] as IEvent[],
  jobevents: [] as IJobEvent[],
  getRole: {} as IRole,
  getDepartment: {} as IDepartment,
};

const ManagerReducer = (
  state = initialState,
  action: ManagerActions
): IManagerState => {
  switch (action.type) {
    case types.MANAGER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.MANAGER_LOGIN_SUCCESS:
      localStorage.setItem("Manager__token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.MANAGER_REGISTER_SUCCESS:
      localStorage.setItem("Manager__token", action.payload.token);
      localStorage.removeItem("Manager__token");
      return {
        ...state,
        ...action.payload,
      };

    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case types.GET_USER:
      return {
        ...state,
        users: action.payload,
      };

    case types.GET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };

    case types.GET_LIST_USERAPPLY:
      return {
        ...state,
        events: action.payload,
      };

    case types.GET_LIST_CTV:
      return {
        ...state,
        events: action.payload,
      };

    case types.UPDATE_COEFFICIENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.event } : event
        ),
      };

    case types.APPROVE_USER_APPLY_JOB:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.event } : event
        ),
      };
    case types.UNAPPROVE_USER_APPLY_JOB:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.event } : event
        ),
      };

    case types.ACCEPT_CTV:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.event } : event
        ),
      };
    case types.UNACCEPT_CTV:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.event } : event
        ),
      };

    case types.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.event } : event
        ),
      };

    case types.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
      };

    case types.GET_JOBEVENTS:
      return {
        ...state,
        jobevents: action.payload,
      };

    case types.CREATE_JOBEVENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.UPDATE_JOBEVENT:
      return {
        ...state,
        jobevents: state.jobevents.map((jobEvent) =>
          jobEvent._id === action.payload.id ? { ...action.payload.jobEvent } : jobEvent
        ),
      };

    case types.DELETE_JOBEVENT:
      return {
        ...state,
        jobevents: state.jobevents.filter((jobevent) => jobevent._id !== action.payload),
      };


    case types.MANAGER_LOGIN_FAIL:
    case types.MANAGER_REGISTER_FAIL:
    case types.MANAGER_AUTH_ERROR:
    case types.MANAGER_LOGOUT:
      localStorage.removeItem("Manager__token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        manager: {} as IManager,
        users: [],
      };

    default:
      return state;
  }
};

export default ManagerReducer;
