import axios from "axios";
import { Dispatch } from "redux";
import { setAdminAuthToken } from "utils/headers";
import { setAlert } from "./alert";
import { AdminActions } from "redux/types/admin";
import { AlertActions } from "redux/types/alert";
import types from "./types";

const URI = "http://localhost:5000/api/v1/admin";
const USER_URI = "http://localhost:5000/api/v1/user";

// LOAD ADMIN
export const loadAdmin = () => async (dispatch: Dispatch<AdminActions>) => {
  if (localStorage.admin__token) setAdminAuthToken(localStorage.admin__token);

  const config: any = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-admin`, config);

    dispatch({ type: types.ADMIN_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.ADMIN_AUTH_ERROR });
  }
};

// LOGIN ADMIN
export const loginAdmin =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<AdminActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/login`, body, config);
        dispatch({
          type: types.ADMIN_LOGIN_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản Admin thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadAdmin());
      } catch (error: any) {
        dispatch({ type: types.ADMIN_LOGIN_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản Admin thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// REGISTER ADMIN
export const registerAdmin =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<AdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${USER_URI}/register`, body, config);
        dispatch({
          type: types.ADMIN_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Admin thành công!",
            status: 200,
            alertType: "success",
          })
        );
        // dispatch<any>(loadAdmin());
      } catch (error: any) {
        dispatch({ type: types.ADMIN_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Admin thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// ADD DEPARTMENT
export const addDepartment =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<AdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/addDepartment`, body, config);
        dispatch({
          type: types.ADMIN_ADDDEPARTMENT_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Thêm khoa thành công!",
            status: 200,
            alertType: "success",
          })
        );
        // dispatch<any>(loadAdmin());
      } catch (error: any) {
        dispatch({ type: types.ADMIN_ADDDEPARTMENT_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Thêm khoa thất bại!",
            status: 200,
            // msg: error.response.data,
            // status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// UPDATE DEPARTMENT
export const updateDepartment =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<AdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.patch(`${URI}/department/${id}`, body, config);
        dispatch({
          type: types.UPDATE_DEPARTMENT,
          payload: data,
        });
        dispatch<any>(getDepartments());
        dispatch<any>(
          setAlert({
            msg: "Cập nhật khoa thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật khoa!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// DELETE USER
export const deleteDepartment =
  (id: number) => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/department/${id}`, config);
      dispatch({ type: types.DELETE_DEPARTMENT, payload: id });
      dispatch<any>(loadAdmin());
      dispatch<any>(
        setAlert({
          msg: "Xóa khoa thành công!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi xóa khoa!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET USERS
export const getUsers =
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
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

// GET USER
export const getUser =
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
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

// GET DEPARTMENTS
export const getDepartments =
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
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
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
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
// GET JOBEVENTS
export const getJobEvents =
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/jobEvents`, config);
      dispatch({ type: types.GET_JOBEVENTS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu jobevents!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };
// GET ROLES
export const getRoles =
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/roles`, config);
      dispatch({ type: types.GET_ROLES, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu role!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// UPDATE USER DATA
export const updateUser =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<AdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.patch(`${URI}/users/${id}`, body, config);
        dispatch({
          type: types.UPDATE_USER,
          payload: data,
        });
        dispatch<any>(getUsers());
        dispatch<any>(
          setAlert({
            msg: "Cập nhật thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật người dùng!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// DELETE USER
export const deleteUser =
  (id: number) => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/users/${id}`, config);
      dispatch({ type: types.DELETE_USER, payload: id });
      dispatch<any>(loadAdmin());
      dispatch<any>(
        setAlert({
          msg: "Xóa thành công!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi xóa người dùng!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// LOGOUT ADMIN
export const logOutAdmin =
  () => (dispatch: Dispatch<AdminActions | AlertActions>) => {
    dispatch({ type: types.ADMIN_LOGOUT });
    dispatch<any>(
      setAlert({
        msg: "Đăng xuất thành công!",
        status: 200,
        alertType: "success",
      })
    );
  };
