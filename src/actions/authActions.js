import * as types from "../store/actionTypes";

export const signUP = (email,password,name,city,position, recaptchaValue) => ({
  type: types.REGISTER,
  payload: {email,password,name,city,position, recaptchaValue},
});

export const setRegisteredUserUndefined = () => ({
  type: types.IS_REGISTERED_USER_UNDEFINED, 
});

export const setResponseMessageUndefined = () => ({
  type: types.IS_RESPONSE_MESSAGE_UNDEFINED, 
});

export const confirmEmpEmail = (email, checkword='') => ({ 
  type: types.CONFIRM_EMPLOYEE_LINK,
  payload: { email, checkword }
}); 
export const setEmpEmailUndefined = () => ({
  type: types.CONFIRM_EMPLOYEE_LINK_UNDEFINED,
  
});
export const auth = (email, password,recaptchaValue) => ({
  type: types.POST_SING_IN,
  payload: { email, password, recaptchaValue }
});

export const clearSignInFinished = () => ({
  type: types.CLEAR_SIGN_IN_FINISHED,
});

export const passwordResetLink = email => ({
  type: types.PASWORD_RESET_LINK,
  payload: { email }
});

export const clearPasswordResetLink = () => ({
  type: types.CLEAR_PASSWORD_RESET_LINK,
});

export const clearPasswordChange = () => ({
  type: types.CLEAR_PASSWORD_CHANGE,
});

export const passwordChange = (n, code, password) => ({
  type: types.PASSWORD_CHANGE,
  payload: { n, code, password }
});

export const registerFriend = (email, code, recaptchaValue) => ({
  type: types.REGISTATION_FRIEND,
  payload: {email, code, recaptchaValue }
});

export const clearRegistrationFriend = () => ({
  type: types.CLEAR_REGISTATION_FRIEND,
});

export const singOut = () => ({
  type: types.SING_OUT
});

export const getProfile = () => ({
  type: types.GET_PROFILE
});


export const setIsConfirmedEmailAndCode = (value) => ({
  type: types.IS_CONFIRMED_EMAIL_AND_CODE,
  payload: value,
});

export const setIsConfirmedEmailAndCodeUndefined = () => ({
  type: types.SET_CONFIRMED_EMAIL_AND_CODE_UNDEFINED,
});


export const toggleActiveTabIdentification = (value) => ({
  type: types.ACTIVE_TAB_IDENTIFICATION,
  payload: value,
});
