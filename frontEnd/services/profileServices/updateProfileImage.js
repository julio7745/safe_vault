
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async ({ user, setEditingImage, setLoading, image }) => {

    setLoading(true)

    try {

      const response = await axios.post(`${URL_API_BACKEND}/profileImage/update/${user._id}`,  { data: {image64: image.base64}, user });

      const message = await jwtDecode(response.data.token).message;
      const data = await jwtDecode(response.data.token).data;

      // tratamento para NON_EXISTENT_USER_ERROR 
      // tratamento para GERAL_ERROR 

      if ( message === 'PROFILE_IMAGE_UPDATE_SUCCESSFUL' || message === 'PROFILE_IMAGE_CREATE_SUCCESSFUL' ) console.log('sucesso');
      
    } catch (error) {
      console.error(`getOpeningsService: ${error}`);
    }

    setLoading(false)
    setEditingImage(false)
    
    return ;
}
