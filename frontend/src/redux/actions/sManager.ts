import axios from "axios";
import { Dispatch } from "redux";
import { setSManagerAuthToken } from "utils/headers";
import { setAlert } from "./alert";
import { SManagerActions, SManagerAdminActions } from "redux/types/sManager";
import { AlertActions } from "redux/types/alert";
import types from "./types";

const URI = "http://localhost:5000/api/v1/smanager";
const USER_URI = "http://localhost:5000/api/v1/user";

// LOAD SMANAGER
export const loadSManager = () => async (dispatch: Dispatch<SManagerActions>) => {
  if (localStorage.SManager__token)
    setSManagerAuthToken(localStorage.SManager__token);
  const config: any = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-SManager`, config);

    dispatch({ type: types.SMANAGER_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.SMANAGER_AUTH_ERROR });
  }
};

// LOGIN SMANAGER
export const loginSManager =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<SManagerActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/login`, body, config);
        dispatch({
          type: types.SMANAGER_LOGIN_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản Quản Lý Cấp Cao thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadSManager());
      } catch (error: any) {
        dispatch({ type: types.SMANAGER_LOGIN_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản Quản Lý Cấp Cao thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// REGISTER SMANAGER
export const registerSManager =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${USER_URI}/register`, body, config);
        dispatch({
          type: types.SMANAGER_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý Cấp Cao thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch({ type: types.SMANAGER_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý Cấp Cao thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// REGISTER SMANAGER ADMIN
export const registerSManagerAdmin =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<SManagerAdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${USER_URI}/register`, body, config);
        dispatch({
          type: types.SMANAGER_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý Cấp Cao thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch({ type: types.SMANAGER_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý Cấp Cao thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };
// GET USER
export const getUser =
  () => async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/user`, config);
      dispatch({ type: types.GET_USER, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu người dùng!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };
// GET USERS
export const getUsers =
  () => async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/users`, config);
      dispatch({ type: types.GET_USERS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu người dùng!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET DEPARTMENTS
export const getDepartments =
  () => async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/departments`, config);
      dispatch({ type: types.GET_DEPARTMENTS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu khoa!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

//GET_EVENTAPPROVE_SMANAGER
export const getEventApprove =
  () => async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/eventApprove`, config);
      dispatch({ type: types.GET_EVENTAPPROVE_SMANAGER, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu event!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// APPROVE EVENT
export const approveEvent =
  (id: number) =>
    async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/event/${id}`, config);
        dispatch({
          type: types.APPROVE_POSTER,
          payload: data,
        });
        dispatch<any>(getEventApprove());
        dispatch<any>(
          setAlert({
            msg: "Duyệt event thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi duyệt event!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// COMMENT EVENT
export const commentEvent =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/comment/${id}`, body, config);
        dispatch({
          type: types.COMMENT_EVENT,
          payload: data,
        });
        dispatch<any>(getEventApprove());
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi comment!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// DELETE COMMENT EVENT
export const deleteComment =
  (eventId: number, id: number) =>
    async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/comment/${eventId}/${id}`, config);
        dispatch({
          type: types.DELETE_COMMENT,
          payload: data,
        });
        dispatch<any>(getEventApprove());
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi xóa comment!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// LOGOUT SMANAGER
export const logOutSManager =
  () => (dispatch: Dispatch<SManagerActions | AlertActions>) => {
    dispatch({ type: types.SMANAGER_LOGOUT });
    dispatch<any>(
      setAlert({
        msg: "Đăng xuất thành công!",
        status: 200,
        alertType: "success",
      })
    );
  };
