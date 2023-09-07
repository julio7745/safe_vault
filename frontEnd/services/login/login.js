import axios from 'axios';
import jwtDecode from 'jwt-decode';

import validateForm from './validateForm'

export default login = async ({ userValue, passwordValue, setUserErrors, setPasswordErrors, setCurrentPage, setUser, }) => {

  const login = validateForm(userValue, passwordValue)

  setUserErrors(login.userErrors || [])
  setPasswordErrors(login.passwordErrors || [])

  if (!login.userErrors && !login.passwordErrors){

    await axios.post( 'http://192.168.18.154:3001/login', login )
    .then(response => {
      
      const login = jwtDecode(response.data.token);

      if (!login.userErrors && !login.passwordErrors){
        setCurrentPage('home');
        setUser({name: login.name, lastName:login.lastName, id:login.id});
      }else{
        setUserErrors(login.userErrors || [])
        setPasswordErrors(login.passwordErrors || [])
      }
      
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });

  }

  return
}