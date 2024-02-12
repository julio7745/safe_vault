
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import validateFormService from './validateFormService.js';
import uploadUserService from './uploadUserService.js';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async ({
    setCurrentPage,
    setLoading,
    setUser,
    login,
    errors, setErrors
  }) => {

    setLoading(true);
    
    const formatedLogin = validateFormService({...{
      login,
      errors, setErrors
    }});

    if( errors.user.length === 0 && errors.password.length === 0 ) {

      try {

        const response = await axios.post(`${URL_API_BACKEND}/login`, formatedLogin);
        const newLogin = jwtDecode(response.data.token);

        // tratamento para GERAL_ERROR 
        
        if (newLogin.message === 'NON_EXISTENT_USER_ERROR'){
          setErrors({ user: ['● User does not exist!'], password: [] });
          return setLoading(false);
        }
        
        if (newLogin.message === 'INCORRECT_PASSWORD_ERROR') {
          setErrors({ user: [], password: ['● Incorrect password!'] });
          return setLoading(false);
        }
        
        if (newLogin.message === 'LOGIN_SUCCESSFUL') {
          
          setErrors({ user: [], password: [] });

          uploadUserService({
            name: newLogin.data.name,
            lastName: newLogin.data.lastName,
            _id: newLogin.data._id,
            password: login.password,
          });

          setUser({
            name: newLogin.data.name,
            lastName: newLogin.data.lastName,
            _id: newLogin.data._id,
          });

          setCurrentPage('profile');

        }
      } catch (error) {
        console.error(`loginService: ${error}`);
      };
    }

    setLoading(false);
    return;
};