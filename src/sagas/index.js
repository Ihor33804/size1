import { all, fork, take, cancel } from "redux-saga/effects";
import * as types from "../store/actionTypes";
import authSaga from "./authSaga";

export default function* rootSaga() {
  while (true) {
    //run all tasks
    const tasks = yield all([fork(authSaga)]);
    yield take([types.SING_OUT_SUCCESS, types.SING_OUT_FAILURE]);
    //if sign_out or token_not_valid cancel sagas
    const [authTask] = tasks;

    yield cancel(authTask);
  }
}
