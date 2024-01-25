
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import logout from '../loginServices/logoutService';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async({
  setCurrentPage,
  setLoading,
  user
  }) => {

    setLoading(true);

    try {

      const response = await axios.post(`${URL_API_BACKEND}/opening/create`, { data: {}, user });
      const message = await jwtDecode(response.data.token).message;

      // tratamento para NON_EXISTENT_USER_ERROR 
      // tratamento para GERAL_ERROR 

      if ( message === 'OPENING_CREATE_SUCCESSFUL' ) setCurrentPage('openings')

    } catch (error) {
      console.error('createOpeningService:', error);
  }
      setLoading(false)
    
    return ;

}
