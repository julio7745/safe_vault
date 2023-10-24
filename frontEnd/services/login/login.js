
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import validateForm from './validateForm';
import uploadUser from './uploadUser';

export default login = async ({ userValue,
  passwordValue,
  setUserErrors,
  setPasswordErrors,
  setCurrentPage,
  setUser,
  setloading }) => {
  
  setloading(true);

  const login = validateForm(userValue='julio.carvalho', passwordValue='123456Aa');

  setUserErrors(login.userErrors || []);
  setPasswordErrors(login.passwordErrors || []);

  if (!login.userErrors && !login.passwordErrors) {

    try {

      const response = await axios.post('http://192.168.18.154:3024/login', login);
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
        });
        
        setCurrentPage('openings');

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