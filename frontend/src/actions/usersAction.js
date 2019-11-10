import axios from 'axios';
import { userLogin, getUser } from '../utils/constants/api';

export const getUserLogin = () => {
  return axios.get(userLogin).then(res => res.data);
};

export const validateEmail = email => {
  return axios
    .post(`${getUser}`, email)
    .then(res => res.data)
    .catch(err => {
      return err;
    });
};
