import { call, put as putEffect } from 'redux-saga/effects';
import axios from 'axios';

import config from '../../config';
import {REGISTATION_FRIEND, SING_OUT} from '../../store/actionTypes';
import * as keys from '../../routers/keys';

export function* get(url, query = null, actionName) {
  return yield apiCall(url, 'GET', query, null, actionName);
}

export function* post(url, query = null, body = null, actionName) {
  return yield apiCall(url, 'POST', body ? query : null, body || query, actionName);
}

export function* put(url, query = null, body = null, actionName) {
  return yield apiCall(url, 'PUT', body ? query : null, body || query, actionName);
}

export function* patch(url, query = null, body = null, actionName) {
  return yield apiCall(url, 'PATCH', body ? query : null, body || query, actionName);
}

export function* del(url, query = null, actionName) {
  return yield apiCall(url, 'DELETE', query, null, actionName);
}

axios.defaults.withCredentials = true;

const axiosRequests = ({ url, method, query, body }) => {

  // let urlLocal = /^(https?:\/\/)/.test(url) ? url : `${config.apiUrl}${url}`;
  // if(actionName === REGISTATION_FRIEND)  urlLocal = /^(https?:\/\/)/.test(url) ? url : `${config.apiForFriend}${url}`

  let request = {
    url: /^(https?:\/\/)/.test(url) ? url : `${config.apiUrl}${url}`,
    timeout: 3000,
    method: method || 'GET',
    data: body,
    params: query,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },    
  }



  return axios(request)
    .then(response => response)
    .catch(error => error);
}

function* apiCall(url, method, query, body, actionName) {

  yield putEffect({ type: `${actionName}_REQUEST` });

  try {
    const response = yield call(axiosRequests, { url, method, query, body, actionName });

    

    if (response && ((response.data.status >= 200)  && (response.data.status < 300))) {
      yield putEffect({
        type: `${actionName}_SUCCESS`,
        payload: response.data,
      });
    } else {
      const payload = yield response;

      if(payload.data.status === 403){
        yield putEffect({
          type: `SING_OUT`,
        });
        window.location.pathname = keys.IDENTIFICATION;
      }
     
      if (payload.data.status >= 400 ) {
        yield putEffect({
          type: `${actionName}_FAILURE`,
          payload: payload.data.statusMeans
        });
      } 
    }
  } catch (error) {
    yield putEffect({
      type: `${actionName}_FAILURE`,
      payload: error
    });
  }
}

