
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Buffer } from 'buffer';
import jwtDecode from 'jwt-decode';
global.Buffer = Buffer;

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async( {setImage, _id, user} ) => {

    
    try {
        
        const valueInCache = JSON.parse( await AsyncStorage.getItem(`ProfileImage.${_id}`) );
        
        if (valueInCache !== null && valueInCache.expired >= Date.now()) {
            
            setImage(valueInCache.base64Image);
            
        } else {
            
            await AsyncStorage.removeItem(`ProfileImage.${_id}`);
            
            const response = await axios.post(`${URL_API_BACKEND}/profileImage/get/${_id }`, { data: {}, user });

            const message = await jwtDecode(response.data.token).message;
            const data = await jwtDecode(response.data.token).data;
            
            // tratamento para NON_EXISTENT_USER_ERROR 
            // tratamento para GERAL_ERROR 
            // tratamento para PROFILE_IMAGE_GET_ERROR

            if ( message === 'PROFILE_IMAGE_GET_SUCCESSFUL' ) {

                const buffer = Buffer.from(data.userImage, 'binary');
                const base64Image = buffer.toString('base64');
                setImage(base64Image);

                const image = {
                    base64Image, 
                    expired: Date.now() + 10 * 60 * 1000,
                };
    
                await AsyncStorage.setItem(`ProfileImage.${_id}`, JSON.stringify(image));

            }
        
        }

    } catch (error) {
        console.error(`getImageProfile: ${error}`);
    }

    return ;
}
