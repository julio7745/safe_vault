
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import validateForm from './validateForm';
import uploadUser from './uploadUser';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async ({ userValue,
  passwordValue,
  setUserErrors,
  setPasswordErrors,
  setCurrentPage,
  setUser,
  setloading }) => {
  
  setloading(true);

  const login = validateForm(userValue='usuario.teste', passwordValue='123456Aa');
  //const login = validateForm(userValue, passwordValue);

  setUserErrors(login.userErrors || []);
  setPasswordErrors(login.passwordErrors || []);

  if (!login.userErrors && !login.passwordErrors) {

    try {

      const response = await axios.post(`${URL_API_BACKEND}/login`, login);
      const loginData = jwtDecode(response.data.token);

      if (!loginData.userErrors && !loginData.passwordErrors) {
        
        uploadUser({
          name: loginData.name,
          lastName: loginData.lastName,
          id: loginData.id,
          password: passwordValue,
        });

        setUser({
          name: loginData.name,
          lastName: loginData.lastName,
          id: loginData.id,
          profileImage: loginData.profileImage,
        });

        setCurrentPage('profile');

      } else {

        setUserErrors(loginData.userErrors || []);
        setPasswordErrors(loginData.passwordErrors || []);

      }
    } catch (error) {
      console.error('Erro:', error);
    }

  }
  
  setloading(false);
  
  return;
};