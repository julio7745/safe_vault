import axios from 'axios';
import jwtDecode from 'jwt-decode';

import validateForm from './validateForm';
import storageUser from './storageUser';

export default login = async ({ userValue, passwordValue, setUserErrors, setPasswordErrors, setCurrentPage, setUser, }) => {
  
  const login = validateForm(userValue, passwordValue);

  setUserErrors(login.userErrors || []);
  setPasswordErrors(login.passwordErrors || []);

  if (!login.userErrors && !login.passwordErrors) {

    try {

      const response = await axios.post('http://192.168.18.154:3001/login', login);
      const loginData = jwtDecode(response.data.token);

      if (!loginData.userErrors && !loginData.passwordErrors) {
        
        storageUser.upload(...{
          name: loginData.name,
          lastName: loginData.lastName,
          id: loginData.id,
        });

        setUser({
          name: loginData.name,
          lastName: loginData.lastName,
          id: loginData.id,
        });
        
        setCurrentPage('home');

      } else {

        setUserErrors(loginData.userErrors || []);
        setPasswordErrors(loginData.passwordErrors || []);

      }
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  return;
};