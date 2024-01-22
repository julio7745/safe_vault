
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async({
    setloading,
    user,
    setOpenings 
  }) => {

    setloading(true)

    try {

      const response = await axios.post(`${URL_API_BACKEND}/opening/getAll`,  { data: {}, user });

      const message = await jwtDecode(response.data.token).message;
      const data = await jwtDecode(response.data.token).data;

      // tratamento para NON_EXISTENT_USER_ERROR 
      // tratamento para GERAL_ERROR 

      if ( message === 'OPENING_GET_ALL_SUCCESSFUL' ) setOpenings(data.openings);
  
    } catch (error) {
      console.error(`getOpeningsService: ${error}`);
    }

    setloading(false)
    
    return ;
}
