import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createUserAPI,
  getAllUser,
  deleteUserAPI,
  editUserAPI,
  getTopDoctorHome,
  getAllDoctor,
  saveDetailInfoDoctor,
} from "../../services/userService";
import { toast } from "react-toastify";
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log(e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log(e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log(e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchCreateUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createUserAPI(data);
      if (res && res.errCode === 0) {
        dispatch(fetchCreateUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        dispatch(fetchCreateUserFailed());
      }
    } catch (e) {
      dispatch(fetchCreateUserFailed());
    }
  };
};
export const fetchCreateUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const fetchCreateUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUser("ALL");

      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (e) {
      dispatch(fetchAllUserFailed());
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});
export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserAPI(userId);

      if (res && res.errCode === 0) {
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      dispatch(deleteUserFailed());
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserAPI(user);

      if (res && res.errCode === 0) {
        dispatch(editSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(editFailed());
      }
    } catch (e) {
      dispatch(editFailed());
    }
  };
};
export const editSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let topDoctor = await getTopDoctorHome("");
      if (topDoctor && topDoctor.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          data: topDoctor.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
      });
    }
  };
};
export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let allDoctor = await getAllDoctor();
      if (allDoctor && allDoctor.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          data: allDoctor.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
      });
    }
  };
};
export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let infoDoctor = await saveDetailInfoDoctor(data);
      console.log(infoDoctor);
      if (infoDoctor && infoDoctor.errCode === 0) {
        toast.success(infoDoctor.errMessage);
        dispatch({
          type: actionTypes.FETCH_SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error(infoDoctor.errMessage);
        dispatch({
          type: actionTypes.FETCH_SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      toast.error(e);
      dispatch({
        type: actionTypes.FETCH_SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};
