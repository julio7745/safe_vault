
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import validateFormService from './validateFormService.js';
import uploadUserService from './uploadUserService.js';

import { URL_API_BACKEND } from 'react-native-dotenv';

import { NON_EXISTENT_USER_ERROR } from 'react-native-dotenv';
import { INCORRECT_PASSWORD_ERROR } from 'react-native-dotenv';
import { LOGIN_SUCCESSFUL } from 'react-native-dotenv';


export default async ({ props }) => {

  props.setloading(true);

  const newLogin = validateFormService({...{props}});

  if( props.errors.user.length === 0 && props.errors.password.length === 0 ) {

    try {

      const response = await axios.post(`${URL_API_BACKEND}/login`, newLogin);
      console.log(response);

      if (response.status === NON_EXISTENT_USER_ERROR) return props.setErrors({ user: ['● User does not exist!']});
      if (response.status === INCORRECT_PASSWORD_ERROR) return props.setErrors({ password: ['● Incorrect password!']});
      
      if (response.status === LOGIN_SUCCESSFUL) {
        
        props.setErrors({ });

        const loginData = jwtDecode(response.data.token);

        uploadUserService({
          name: loginData.name,
          lastName: loginData.lastName,
          _id: loginData._id,
          password: props.login.password,
        });

        props.setUser({
          name: loginData.name,
          lastName: loginData.lastName,
          _id: loginData._id,
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