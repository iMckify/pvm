import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { userLogin, userRegister, snackbarMessages } from '../utils/constants';
import { SET_CURRENT_USER, LOGOUT } from './types';
import setAuthToken from './setAuthToken';
import { validateEmail } from './usersAction';

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const loginUser = (user, openSnackbar, setError) => dispatch => {
  axios
    .post(userLogin, user)
    .then(res => {
      localStorage.setItem('jwtToken', res.data);
      setAuthToken(res.data);
      validateEmail(jwtDecode(res.data).email).then(userData => {
        dispatch(setCurrentUser(userData));
      });
      openSnackbar({
        message: snackbarMessages.loginSuccess,
        variant: 'success'
      });
    })
    .catch(err => {
      // console.log(`err.response.data.Status yra ${err.response.data.Status}`);
      // console.log(`err.response.status yra ${err.response.status}`);
      const errorData = {
        Status: err.response.status,
        Message: err.response.data.Message // for message set in client use snackbarMessages.loginError
      };
      setError(errorData);
    });
};

export const logoutUser = dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch({ type: LOGOUT });
};

export const registerUser = (user, openSnackbar, setError, switchWindow) => {
  axios
    .post(userRegister, user)
    .then(() => {
      openSnackbar({ message: snackbarMessages.registrationSuccess, variant: 'success' });
      switchWindow();
    })
    .catch(err => {
      const errorData = {
        Status: err.response.status,
        Message: err.response.data.Message // for message set in client use snackbarMessages.registrationError
      };
      setError(errorData);
    });
};
