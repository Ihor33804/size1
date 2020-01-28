import * as types from "../store/actionTypes";

export const toggleActive = (value) => ({
  type: types.TOOGLE_ACTIVE_PROFILE_CONTENT
});

export const toggleEmailCheckEmpModal = (value) => ({
  type: types.SHOW_EMAIL_CHECK_EMP_MODAL,
  payload: value,
});


export const toggleMenu = (value) => ({
  type: types.TOOGLE_MENU,
 
});

export const setLg = () => ({
  type: types.LG,
});


export const setIsResetPassword = (value) => ({
  type: types.IS_RESET_PASSWORD,
  payload: value,
});
