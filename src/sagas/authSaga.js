import { takeLatest } from 'redux-saga/effects';
import * as api from './api';
import * as types from '../store/actionTypes';

export function* signUP({payload: {email,password,name,city,position,recaptchaValue}}) {
  yield api.post('Emps/register',null, {email,password,name,city,position,recaptchaValue}, types.REGISTER );
}

export function* confirmEmpEmailSaga({payload: {email, checkword}}) {
  yield api.post('Emps/confirmEmail',null, {email, checkword}, types.CONFIRM_EMPLOYEE_LINK );
}

export function* authSaga({payload: {email, password, recaptchaValue}}) {
  yield api.post('Emps/auth',null, {email, password, recaptchaValue}, types.POST_SING_IN );
}

export function* passwordResetLinkSaga({payload: {email}}) {
  yield api.post('Emps/passwordResetLink',null, {email}, types.PASWORD_RESET_LINK );
}

export function* passwordChangeSaga({payload: {n, code, password}}) {
  yield api.post('Emps/passwordChange',null, {n, code, password}, types.PASSWORD_CHANGE );
}

export function* registerFriendSaga({payload: {email, code, recaptchaValue}}) {
  yield api.post('Friends/register',null, {email, code, recaptchaValue}, types.REGISTATION_FRIEND );
}

export function* getProfileSaga() {
  yield api.post('Emps',null, null, types.GET_PROFILE );
}

export function* singOutSaga() {
  yield api.post('Emps/logout',null, null, types.SING_OUT );
}

export default function* () {
  yield takeLatest(types.CONFIRM_EMPLOYEE_LINK, confirmEmpEmailSaga);
  yield takeLatest(types.REGISTER, signUP);
  yield takeLatest(types.POST_SING_IN, authSaga);
  yield takeLatest(types.PASWORD_RESET_LINK, passwordResetLinkSaga);
  yield takeLatest(types.PASSWORD_CHANGE, passwordChangeSaga);
  yield takeLatest(types.REGISTATION_FRIEND, registerFriendSaga);
  yield takeLatest(types.GET_PROFILE, getProfileSaga);
  yield takeLatest(types.SING_OUT, singOutSaga);

}
