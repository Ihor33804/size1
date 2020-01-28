import initialState from "../store/initialState";
import injectReducer from "../store/injectReducer";

import * as types from "../store/actionTypes";

export default injectReducer(initialState.userReducer, {
   [types.TOOGLE_ACTIVE_PROFILE_CONTENT]: (state) => ({
    ...state,
    toggleActiveProfileContent: !state.toggleActiveProfileContent,
  }),

  [types.SHOW_EMAIL_CHECK_EMP_MODAL]: (state, {payload: value}) => ({
    ...state,
    showEmailCheckEmpModal: value,
  }),



  [types.TOOGLE_MENU]: (state) => ({
    ...state,
    isOpenMenu:  !state.isOpenMenu,
  }),
  [types.LG]: (state, {payload: value}) => ({
    ...state,
    lg: value,
  }),


  [types.IS_RESET_PASSWORD]: (state, {payload: value}) => ({
    ...state,
    isResetPassword: value,
  }),
});

