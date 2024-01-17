
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import validateFormService from './validateFormService.js';
import uploadUserService from './uploadUserService.js';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async ({ props }) => {

  props.setloading(true);
  
  const newLogin = validateFormService({...{props}});

  if( props.errors.user.length === 0 && props.errors.password.length === 0 ) {

    try {

      const response = await axios.post(`${URL_API_BACKEND}/login`, newLogin);
      const login = jwtDecode(response.data.token);
      
      if (login.message === 'NON_EXISTENT_USER_ERROR'){
        props.setErrors({ user: ['● User does not exist!'], password: [] });
        return props.setloading(false);
      }
      
      if (login.message === 'INCORRECT_PASSWORD_ERROR') {
        props.setErrors({ user: [], password: ['● Incorrect password!'] });
        return props.setloading(false);
      }
      
      if (login.message === 'LOGIN_SUCCESSFUL') {
        
        props.setErrors({ user: [], password: [] });

        uploadUserService({
          name: login.data.name,
          lastName: login.data.lastName,
          _id: login.data._id,
          password: props.login.password,
        });

        props.setUser({
          name: login.data.name,
          lastName: login.data.lastName,
          _id: login.data._id,
        });

        props.setCurrentPage('home');

      }
    } catch (error) {
      console.error(`loginService: ${error}`);
    };
  }

  props.setloading(false);
  return;
};