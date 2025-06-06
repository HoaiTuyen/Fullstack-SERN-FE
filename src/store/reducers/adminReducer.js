import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  users: [],
  isLoadingGender: false,
  isLoadingUser: false,
  topDoctor: [],
  allDoctor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.genders = [];
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.CREATE_USER_SUCCESS:
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_START:
      state.isLoadingUser = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      state.isLoadingUser = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.isLoadingUser = false;

      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.topDoctor = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      state.allDoctor = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
