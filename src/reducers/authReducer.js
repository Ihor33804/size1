import initialState from "../store/initialState";
import injectReducer from "../store/injectReducer";

import * as types from "../store/actionTypes";

export default injectReducer(initialState.authReducer, {
  [types.SING_OUT]: (state) => ({
    ...state,
    ...initialState.authReducer
  }), 
  [types.REGISTER_REQUEST]: (state ) => ({
    ...state,
    isRequest: true,
    isRegisteredUser: undefined,
    isRegistered: undefined,
  }),
  [types.REGISTER_FAILURE]: (state ) => ({
    ...state,
    isRequest: false,
    isRegisteredUser: false,
    isRegistered: false,
  }),
  [types.REGISTER_SUCCESS]: (state ) => ({
    ...state,
    isRequest: false,
    isRegisteredUser: true,
    isRegistered: true,
  }),

  [types.IS_REGISTERED_USER_UNDEFINED]: (state ) => ({
    ...state,
    isRegisteredUser: undefined,

  }),
  [types.CONFIRM_EMPLOYEE_LINK_REQUEST]: (state ) => ({
    ...state,
    isRequest: true,
    responseMessage: undefined,
  }),
  [types.CONFIRM_EMPLOYEE_LINK_FAILURE]: (state, {payload} ) => ({
    ...state,
    isRequest: false,
    isConfirmedEmail: false,
    responseMessage: payload,
  }),
  [types.CONFIRM_EMPLOYEE_LINK_SUCCESS]: (state, {payload} ) => ({
    ...state,
    isRequest: false,
    isConfirmedEmail: true,
    responseMessage: payload,
  }),

  [types.IS_RESPONSE_MESSAGE_UNDEFINED]: state => ({
    ...state,
    responseMessage: undefined,
  }),
 

  [types.CONFIRM_EMPLOYEE_LINK_UNDEFINED]: state => ({
    ...state,
    isConfirmedEmail: undefined,
  }),
 
  [types.POST_SING_IN_FAILURE]: (state, {payload } ) => ({
    ...state,
    isRequest: false,
    signInFinished: false,
    signInFinishedError: payload
  }),
  [types.POST_SING_IN_REQUEST]: (state ) => ({
    ...state,
    isRequest: true,
    signInFinished: undefined,
    signInFinishedError: undefined,
  }),
  [types.POST_SING_IN_SUCCESS]: (state, {payload:{emp:{active, city, code, email, id, name, position}, friends}} ) => ({
    ...state,
    isRequest: false,
    signInFinished: true,
    active,
    city, 
    code, 
    email, 
    id, 
    name, 
    position,
    friends
  }),
  [types.GET_PROFILE_FAILURE]: (state, {payload } ) => ({
    ...state,
    isRequest: false,   
  }),
  [types.GET_PROFILE_REQUEST]: (state ) => ({
    ...state,
    isRequest: true,
  }),
  [types.GET_PROFILE_SUCCESS]: (state, {payload:{emp:{active, city, code, email, id, name, position}, friends}} ) => ({
    ...state,
    isRequest: false,
    active,
    city, 
    code, 
    email, 
    id, 
    name, 
    position,
    friends
  }),
  [types.CLEAR_SIGN_IN_FINISHED]: (state) => ({
    ...state,
    signInFinished: undefined,
    signInFinishedError: undefined,
  }),
  [types.PASWORD_RESET_LINK_REQUEST]: (state, {payload } ) => ({
    ...state,
    isRequest: true,
    resetPasswordLink: undefined,
    resetPasswordLinkError: undefined,
  }),
  [types.PASWORD_RESET_LINK_FAILURE]: (state, {payload} ) => ({
    ...state,
    isRequest: false,
    resetPasswordLink: false,
    resetPasswordLinkError: payload,
  }),
  [types.PASWORD_RESET_LINK_SUCCESS]: (state ) => ({
    ...state,
    isRequest: false,
    resetPasswordLink: true,
    resetPasswordLinkError: undefined,
  }),
  [types.CLEAR_SIGN_IN_FINISHED]: (state) => ({
    ...state,
    signInFinished: undefined,
    signInFinishedError: undefined,
  }),
  [types.CLEAR_PASSWORD_RESET_LINK]: (state) => ({
    ...state,
    resetPasswordLink: undefined,
    resetPasswordLinkError: undefined,
  }),
  [types.PASSWORD_CHANGE_REQUEST]: (state) => ({
    ...state,
    isRequest: true,
    passwordChangedStatus: undefined,
    passwordChangedError: undefined,
  }),  
  [types.PASSWORD_CHANGE_FAILURE]: (state, {payload}) => ({
    ...state,
    isRequest: false,
    passwordChangedStatus: false,
    passwordChangedError: payload,
  }),  
  [types.PASSWORD_CHANGE_SUCCESS]: (state, {payload:{emp:{active, city, code, email, id, name, position}, friends}} ) => ({
    ...state,
    isRequest: false,
    passwordChangedStatus: true,
    passwordChangedError: undefined,
    active,
    city, 
    code, 
    email, 
    id, 
    name, 
    position,
    friends
  }),
  [types.CLEAR_PASSWORD_CHANGE]: (state) => ({
    ...state,
    passwordChangedStatus: undefined,
    passwordChangedError: undefined,
  }),
  [types.REGISTATION_FRIEND_REQUEST]: (state) => ({
    ...state,
    isRequest: true,
    registrationFriendFinished: undefined,
    registrationFriendFinishedErrorText: undefined,
  }),  
  [types.REGISTATION_FRIEND_FAILURE]: (state, {payload}) => ({
    ...state,
    isRequest: false,
    registrationFriendFinished: false,
    registrationFriendFinishedErrorText: payload
  }),  
  [types.REGISTATION_FRIEND_SUCCESS]: (state) => ({
    ...state,
    isRequest: false,
    registrationFriendFinished: true,    
  }),
  [types.CLEAR_REGISTATION_FRIEND]: (state) => ({
    ...state,
    registrationFriendFinished: undefined,
    registrationFriendFinishedErrorText: undefined,
  }),


  [types.IS_CONFIRMED_EMAIL_AND_CODE]: (state, {payload: value}) => ({
    ...state,
    isConfirmedEmailAndCode: value,
  }),  
  [types.SET_CONFIRMED_EMAIL_AND_CODE_UNDEFINED]: (state) => ({
    ...state,
    isConfirmedEmailAndCode: undefined,
  }),  

  [types.ACTIVE_TAB_IDENTIFICATION]: (state, {payload: value}) => ({
    ...state,
    activeTabIdentification: value,
  }),  
  

});

