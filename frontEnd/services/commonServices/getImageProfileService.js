import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Buffer } from 'buffer';
import jwtDecode from 'jwt-decode';
global.Buffer = Buffer;

import { URL_API_BACKEND } from 'react-native-dotenv';

const getImageProfileService = ({ _id, user }) => {
  return new Promise(async (resolve, reject) => {
    try {

      const valueInCache = JSON.parse(await AsyncStorage.getItem(`ProfileImage.${_id}`));

      if (valueInCache !== null && valueInCache.expired >= Date.now()) {
        resolve(`data:image/${valueInCache.extension};base64,${valueInCache.base64Image}`);
        return `data:image/${valueInCache.extension};base64,${valueInCache.base64Image}`;
      }

      const response = await axios.post(`${URL_API_BACKEND}/profileImage/get/${_id}`, { data: {}, user });
      const message = jwtDecode(response.data.token).message;
      const data = jwtDecode(response.data.token).data;

      if (message === 'PROFILE_IMAGE_GET_SUCCESSFUL') {
        const buffer = Buffer.from(data.userImage.imageBuffer, 'binary');
        const base64Image = buffer.toString('base64');

        const image = {
          base64Image, 
          extension: data.userImage.extension,
          expired: Date.now() + 10 * 60 * 1000,
        };

        await AsyncStorage.removeItem(`ProfileImage.${_id}`);
        await AsyncStorage.setItem(`ProfileImage.${data.userImage.idOfUser}`, JSON.stringify(image));

        resolve(`data:image/${data.userImage.extension};base64,${base64Image}`);
        return `data:image/${data.userImage.extension};base64,${base64Image}`;

      }
      
    } catch (error) {
      reject(error);
    }
  });
};

export default getImageProfileService;
