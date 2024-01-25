
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async({
    setLoading,
    user,
    setUsers 
  }) => {

    setLoading(true)

    try {

      const response = await axios.post(`${URL_API_BACKEND}/user/getAll`, { data: {}, user });

      const message = await jwtDecode(response.data.token).message;
      const data = await jwtDecode(response.data.token).data;

      // tratamento para NON_EXISTENT_USER_ERROR 
      // tratamento para GERAL_ERROR 

      if ( message === 'USER_GET_ALL_SUCCESSFUL' ) setUsers(data.users);
  
    } catch (error) {
      console.error(`getUsersService: ${error}`);
    }

    setLoading(false)
        
    return ;
}
