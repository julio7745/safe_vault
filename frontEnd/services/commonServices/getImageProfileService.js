
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Buffer } from 'buffer';
import jwtDecode from 'jwt-decode';
global.Buffer = Buffer;

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async( {setImage = null, _id, user} ) => {

  try {
      
    const valueInCache = JSON.parse( await AsyncStorage.getItem(`ProfileImage.${_id}`) );
      
    if (valueInCache !== null && valueInCache.expired >= Date.now()) {
        
      if (setImage) setImage(`data:image/${valueInCache.extension};base64,${valueInCache.base64Image}`);
        
    } else {
          
      await AsyncStorage.removeItem(`ProfileImage.${_id}`);
      
      const response = await axios.post(`${URL_API_BACKEND}/profileImage/get/${_id }`, { data: {}, user });

      const message = await jwtDecode(response.data.token).message;
      const data = await jwtDecode(response.data.token).data;

      // tratamento para NON_EXISTENT_USER_ERROR 
      // tratamento para GERAL_ERROR 
      // tratamento para PROFILE_IMAGE_GET_ERROR

      if ( message === 'PROFILE_IMAGE_GET_SUCCESSFUL' ) {

        const buffer = Buffer.from(data.userImage.imageBuffer, 'binary');
        const base64Image = buffer.toString('base64');

        if (setImage) setImage(`data:image/${data.userImage.extension};base64,${base64Image}`);

        const image = {
          base64Image, 
          extension: data.userImage.extension,
          expired: Date.now() + 10 * 60 * 1000,
        };
  
        await AsyncStorage.setItem(`ProfileImage.${data.userImage.idOfUser}`, JSON.stringify(image));
      
      }
    }

  } catch (error) {
      console.error(`getImageProfile: ${error}`);
  }

  return ;
}
