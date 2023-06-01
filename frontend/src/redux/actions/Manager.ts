import axios from "axios";
import { Dispatch } from "redux";
import { setManagerAuthToken } from "utils/headers";
import { setAlert } from "./alert";
import { ManagerActions, ManagerAdminActions } from "redux/types/Manager";
import { AlertActions } from "redux/types/alert";
import types from "./types";

const URI = "https://datnctv.onrender.com/api/v1/manager";
const USER_URI = "https://datnctv.onrender.com/api/v1/user";

// LOAD MANAGER
export const loadManager = () => async (dispatch: Dispatch<ManagerActions>) => {
  if (localStorage.Manager__token)
    setManagerAuthToken(localStorage.Manager__token);
  const config: any = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-Manager`, config);

    dispatch({ type: types.MANAGER_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.MANAGER_AUTH_ERROR });
  }
};

// LOGIN MANAGER
export const loginManager =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<ManagerActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/login`, body, config);
        dispatch({
          type: types.MANAGER_LOGIN_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản Quản Lý thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadManager());
      } catch (error: any) {
        dispatch({ type: types.MANAGER_LOGIN_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản Quản Lý thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// REGISTER MANAGER
export const registerManager =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${USER_URI}/register`, body, config);
        dispatch({
          type: types.MANAGER_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch({ type: types.MANAGER_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// REGISTER MANAGER ADMIN
export const registerManagerAdmin =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<ManagerAdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${USER_URI}/register`, body, config);
        dispatch({
          type: types.MANAGER_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch({ type: types.MANAGER_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// GET USERS
export const getUsers =
  () => async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
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
  () => async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
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

// GET LIST USER APPLY
export const getListUserApply =
  () => async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/jobUserApply`, config);
      dispatch({ type: types.GET_LIST_USERAPPLY, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu event user apply!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET LIST CTV
export const getListCTV =
  () => async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/ctv`, config);
      dispatch({ type: types.GET_LIST_CTV, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu cộng tác viên!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// UPDATE COEFFICIENT
export const updateCoefficient =
  (body: any, eventId: number, userApplyId: number, setSubmitting: any) =>
    async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/coefficient/${eventId}/${userApplyId}`, body, config);
        dispatch({
          type: types.UPDATE_COEFFICIENT,
          payload: data,
        });
        dispatch<any>(getListCTV());
        // dispatch<any>(
        //   setAlert({
        //     msg: "Duyệt người dùng thành công!",
        //     status: 200,
        //     alertType: "success",
        //   })
        // );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Duyệt người dùng thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// APPROVE USER APPLY JOB
export const approveUserApplyJob =
  (eventId: number, userApplyId: number) =>
    async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/approveUser/${eventId}/${userApplyId}`, config);
        dispatch({
          type: types.APPROVE_USER_APPLY_JOB,
          payload: data,
        });
        dispatch<any>(getListUserApply());
        // dispatch<any>(
        //   setAlert({
        //     msg: "Duyệt người dùng thành công!",
        //     status: 200,
        //     alertType: "success",
        //   })
        // );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Duyệt người dùng thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// UNAPPROVE USER APPLY JOB
export const unapproveUserApplyJob =
  (eventId: number, userApplyId: number) =>
    async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/unapproveUser/${eventId}/${userApplyId}`, config);
        dispatch({
          type: types.UNAPPROVE_USER_APPLY_JOB,
          payload: data,
        });
        dispatch<any>(getListUserApply());
        // dispatch<any>(
        //   setAlert({
        //     msg: "Không duyệt người dùng thành công!",
        //     status: 200,
        //     alertType: "success",
        //   })
        // );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Không duyệt người dùng thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// ACCEPT CTV
export const acceptCTV =
  (eventId: number, userApplyId: number) =>
    async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/acceptCTV/${eventId}/${userApplyId}`, config);
        dispatch({
          type: types.ACCEPT_CTV,
          payload: data,
        });
        dispatch<any>(getListCTV());
        // dispatch<any>(
        //   setAlert({
        //     msg: "Duyệt người dùng thành công!",
        //     status: 200,
        //     alertType: "success",
        //   })
        // );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Duyệt người dùng thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// UNACCEPT CTV
export const unacceptCTV =
  (eventId: number, userApplyId: number) =>
    async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/unAcceptCTV/${eventId}/${userApplyId}`, config);
        dispatch({
          type: types.UNACCEPT_CTV,
          payload: data,
        });
        dispatch<any>(getListCTV());
        // dispatch<any>(
        //   setAlert({
        //     msg: "Không duyệt người dùng thành công!",
        //     status: 200,
        //     alertType: "success",
        //   })
        // );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Không duyệt người dùng thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// GET EVENTS
export const getEvents =
  () => async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/event`, config);
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

// CREATE EVENT
type formdata = FormData;
export const createEvent =
  (formData: formdata, setSubmitting: any) =>
    async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-type": "multipart/form-data",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/createEvent`, formData, config);
        dispatch({
          type: types.CREATE_EVENT_SUCCESS,
          payload: data,
        });
        // dispatch<any>(loadManager());
        dispatch<any>(
          setAlert({
            msg: "Thêm event thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadManager());
      } catch (error: any) {
        dispatch({ type: types.CREATE_EVENT_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Thêm event thất bại!",
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

// UPDATE EVENT
export const updateEvent =
  (formData: formdata, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/event/${id}`, formData, config);
        dispatch({
          type: types.UPDATE_EVENT,
          payload: data,
        });
        dispatch<any>(getEvents());
        dispatch<any>(
          setAlert({
            msg: "Cập nhật event thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật event!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// DELETE EVENT
export const deleteEvent =
  (id: number) => async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/event/${id}`, config);
      dispatch({ type: types.DELETE_EVENT, payload: id });
      dispatch<any>(loadManager());
      dispatch<any>(
        setAlert({
          msg: "Xóa event thành công!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi xóa event!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET JOBEVENTS
export const getJobEvents =
  () => async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
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
// CREATE JOBEVENT
export const createJobEvent =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/createJobEvent`, body, config);
        dispatch({
          type: types.CREATE_JOBEVENT_SUCCESS,
          payload: data,
        });
        // dispatch<any>(loadManager());
        dispatch<any>(
          setAlert({
            msg: "Thêm jobevent thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadManager());
      } catch (error: any) {
        dispatch({ type: types.CREATE_JOBEVENT_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Thêm jobevent thất bại!",
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

// UPDATE JOBEVENT
export const updateJobEvent =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/jobEvent/${id}`, body, config);
        dispatch({
          type: types.UPDATE_JOBEVENT,
          payload: data,
        });
        dispatch<any>(getJobEvents());
        dispatch<any>(
          setAlert({
            msg: "Cập nhật jobevent thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật jobevent!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// DELETE JOBEVENT
export const deleteJobEvent =
  (id: number) => async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/jobEvent/${id}`, config);
      dispatch({ type: types.DELETE_JOBEVENT, payload: id });
      dispatch<any>(loadManager());
      dispatch<any>(
        setAlert({
          msg: "Xóa jobevent thành công!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi xóa jobevent!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };
// LOGOUT MANAGER
export const logOutManager =
  () => (dispatch: Dispatch<ManagerActions | AlertActions>) => {
    dispatch({ type: types.MANAGER_LOGOUT });
    dispatch<any>(
      setAlert({
        msg: "Đăng xuất thành công!",
        status: 200,
        alertType: "success",
      })
    );
  };
