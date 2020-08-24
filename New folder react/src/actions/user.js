import { SET_CURRENT_USER, APP_CONTEXT_URL } from 'utils/constants';
import request from 'service';
import { setAuthToken } from 'utils/authToken';

/** USER ACTIONS */

export const registerUser = (values, history) => {
  request({
    method: 'POST',
    url: APP_CONTEXT_URL + '/v1/register',
    data: values,
    loadingText: 'Please Wait...',
  }).then(() => {
    history.push('/login');
  });
};
export const loginUser = (values, history, location) => {
  //setAuthToken(`Basic ${btoa(`${values.username}:${values.password}`)}`);
  return (dispatch) => {
    request({
      method: 'POST',
      url: APP_CONTEXT_URL + '/v1/login',
      data: values,
      loadingText: 'Logging You In...',
    }).then((res) => {
      if (res) {
        dispatch(saveUserData(res));
        let { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      }
    });
  };
};

export const loadUserInfo = () => {
  return (dispatch) => {
    request({
      method: 'POST',
      url: APP_CONTEXT_URL + '/v1/user',
      loadingText: 'Loading User Info...',
    }).then((res) => {
      dispatch(saveUserData(res));
    });
  };
};
export const saveUserData = (userInfo) => {
  return {
    type: SET_CURRENT_USER,
    payload: userInfo,
  };
};
