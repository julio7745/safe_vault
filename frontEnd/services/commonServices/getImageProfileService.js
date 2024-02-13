
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Buffer } from 'buffer';
import jwtDecode from 'jwt-decode';
global.Buffer = Buffer;

import { URL_API_BACKEND } from 'react-native-dotenv';

export default ({ setImage = null, _id, user }) => {
  AsyncStorage.getItem(`ProfileImage.${_id}`)
    .then((valueInCache) => {
      if (valueInCache !== null && JSON.parse(valueInCache).expired >= Date.now()) {
        if (setImage) {
          setImage(`data:image/${JSON.parse(valueInCache).extension};base64,${JSON.parse(valueInCache).base64Image}`);
        }
      } else {
        axios.post(`${URL_API_BACKEND}/profileImage/get/${_id}`, { data: {}, user })
          .then((response) => {
            const decodedToken = jwtDecode(response.data.token);
            const message = decodedToken.message;
            const data = decodedToken.data;

            if (message === 'PROFILE_IMAGE_GET_SUCCESSFUL') {
              const buffer = Buffer.from(data.userImage.imageBuffer, 'binary');
              const base64Image = buffer.toString('base64');

              if (setImage) {
                setImage(`data:image/${data.userImage.extension};base64,${base64Image}`);
              }

              AsyncStorage.removeItem(`ProfileImage.${_id}`)
                .then(() => {
                  
                  const image = {
                    base64Image,
                    extension: data.userImage.extension,
                    expired: Date.now() + 10 * 60 * 1000,
                  };
    
                  AsyncStorage.setItem(`ProfileImage.${data.userImage.idOfUser}`, JSON.stringify(image))
                    .catch((error) => {
                      console.error(`Failed to save image to AsyncStorage: ${error}`);
                    });
                })
                .catch((error) => {
                  console.error(`Failed to remove item from AsyncStorage: ${error}`);
                });
            }
          })
          .catch((error) => {
            console.error(`Failed to fetch profile image: ${error}`);
          });
      }
    })
    .catch((error) => {
      console.error(`Failed to get item from AsyncStorage: ${error}`);
    });
};