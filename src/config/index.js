export default {
  apiUrl: (process.env.NODE_ENV === 'development') ? 'https://1:1@jti-logic-ambassadors.familyagency.ru/api/' : `${window.location.origin}/api/`,
  apiForFriend: (process.env.NODE_ENV === 'development') ? 'https://1:1@jti-logic-ambassadors.familyagency.ru/api/' : `${window.location.origin}/api/`,
  siteUrl: (process.env.NODE_ENV === 'development') ? 'https://1:1@jti-logic-ambassadors.familyagency.ru' : `${window.location.origin}`,
};
 //apiUrl: 'https://1:1@jti-logic-ambassadors.familyagency.ru/api/',
// apiUrl: 'http://jti-logic-ambassadors.familyagency.ru/api/',