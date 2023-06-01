import { Dispatch } from "redux";
import axios from "axios";
import types from "./types";
import { setUserAuthToken } from "utils/headers";
import { UserActions } from "redux/types/user";
import { AlertActions } from "redux/types/alert";
import { setAlert } from "./alert";

const URI = "https://datnctv.onrender.com/api/v1/user";

// LOAD USER
export const loadUser = () => async (dispatch: Dispatch<UserActions>) => {
  if (localStorage.user__token) setUserAuthToken(localStorage.user__token);

  const config: any = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-user`, config);
    dispatch({ type: types.USER_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.USER_AUTH_ERROR });
  }
};

// LOGIN USER
export const loginUser =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/login`, body, config);
        dispatch({
          type: types.USER_LOGIN_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadUser());
      } catch (error: any) {
        dispatch({ type: types.USER_LOGIN_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản User thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// REGISTER USER
export const registerUser =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/register`, body, config);
        dispatch({
          type: types.USER_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản User thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadUser());
      } catch (error: any) {
        dispatch({ type: types.USER_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản User thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// LOGOUT USER
export const logOutUser =
  () => (dispatch: Dispatch<UserActions | AlertActions>) => {
    dispatch({ type: types.USER_LOGOUT });
    dispatch<any>(
      setAlert({
        msg: "Đăng xuất thành công!",
        status: 200,
        alertType: "success",
      })
    );
  };

// GET DEPARTMENTS
export const getDepartments =
  () => async (dispatch: Dispatch<UserActions | AlertActions>) => {
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

// GET EVENTS
export const getEvents =
  () => async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/events`, config);
      dispatch({ type: types.GET_EVENTS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu events!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET STORAGER
export const getStorager =
  () => async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/eventStorager`, config);
      dispatch({ type: types.GET_STORAGER, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu events!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// CREATE STORAGER
export const createStorager =
  (id: number) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/storager/${id}`, config);
        dispatch({
          type: types.CREATE_STORAGER,
          payload: data,
        });
        dispatch<any>(getEvents());
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi tạo storager!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// DELETE STORAGER
export const deleteStorager =
  (id: number) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/unstorager/${id}`, config);
        dispatch({
          type: types.DELETE_STORAGER,
          payload: data,
        });
        dispatch<any>(getEvents());
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi xóa storager!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// DELETE STORAGER IN LIST
export const deleteStoragerInList =
  (id: number) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/unstorager/${id}`, config);
        dispatch({
          type: types.DELETE_STORAGER,
          payload: data,
        });
        dispatch<any>(getStorager());
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi xóa storager!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// GET APPLY JOB
export const getApplyJob =
  () => async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/jobUserApply`, config);
      dispatch({ type: types.GET_JOB_USER_APPLY, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu công việc ứng tuyển!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// USER APPLY JOB
export const userApplyJob =
  (eventId: number, jobId: number) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/userApply/${eventId}/${jobId}`, config);
        dispatch({
          type: types.USER_APPLY_JOB,
          payload: data,
        });
        dispatch<any>(getEvents());
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi ứng tuyển!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } 
    };

// USER UNAPPLY JOB
export const userUnApplyJob =
  (eventId: number, jobId: number) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/userUnApply/${eventId}/${jobId}`, config);
        dispatch({
          type: types.USER_UNAPPLY_JOB,
          payload: data,
        });
        dispatch<any>(getEvents());
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi bỏ ứng tuyển!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };  

// GET PROFILE
export const getProfile =
  () => async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/profile`, config);
      dispatch({ type: types.GET_PROFILE, payload: data });
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

// UPDATE PROFILE
type formdata = FormData;
export const updateProfile =
  (formData: formdata, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/profile/${id}`, formData, config);
        dispatch({
          type: types.UPDATE_PROFILE,
          payload: data,
        });
        dispatch<any>(getProfile());
        // dispatch<any>(
        //   setAlert({
        //     msg: "Cập nhật thông tin thành công!",
        //     status: 200,
        //     alertType: "success",
        //   })
        // );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật thông tin!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };
