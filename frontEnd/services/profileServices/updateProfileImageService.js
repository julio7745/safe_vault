
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
global.Buffer = Buffer;

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async ({ user, setEditingImage, setLoading, image, setProfileImage }) => {

    setLoading(true)

    try {

      const imageBuffer = Buffer.from(image.base64, 'base64');
      const imgExtension = image.imgExtension

      const response = await axios.post(`${URL_API_BACKEND}/profileImage/update/${user._id}`,  { data: {imageBuffer, imgExtension}, user });

      const message = await jwtDecode(response.data.token).message;
      const data = await jwtDecode(response.data.token).data;

      // tratamento para NON_EXISTENT_USER_ERROR 
      // tratamento para GERAL_ERROR 

      if ( message === 'PROFILE_IMAGE_UPDATE_SUCCESSFUL' ) {
        setProfileImage(image.uri)
        const newImage = {
          base64Image: image.base64, 
          extension: image.imgExtension,
          expired: Date.now() + 10 * 60 * 1000,
        };
        await AsyncStorage.setItem(`ProfileImage.${user._id}`, JSON.stringify(newImage));
      }
      
    } catch (error) {
      console.error(`updateProfileImageService: ${error}`);
    }

    setLoading(false)
    setEditingImage(false)
    
    return ;
}
