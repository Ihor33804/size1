export default {
  authReducer: {
    isRequest: false,  
    userRegisterData: undefined,
    signInFinishedError: undefined,
    signInFinished: undefined,
    resetPasswordLink: undefined,
    resetPasswordLinkError: undefined,
    passwordChangedStatus: undefined,
    passwordChangedError: undefined,
    registrationFriendFinished: undefined,
    registrationFriendFinishedErrorText: undefined,
    active: 0,
    city: '', 
    code: 0, 
    email: '', 
    id: undefined, 
    name: undefined, 
    position: undefined,
    isConfirmedEmail: undefined,
    isConfirmedCode: undefined,
    responseMessage: undefined,
    isRegisteredUser: undefined,
    isRegistered: undefined,
    isConfirmedEmailAndCode: undefined,
    activeTabIdentification: '1',
  },
  userReducer: {
    toggleActiveProfileContent: false, //для переключения контента на странице аккаунта в моб. версии
    showEmailCheckEmpModal: false,
    isOpenMenu: false, //для переключения моб меню 
    lg: '12',
    isResetPassword: false,
  } 
};
