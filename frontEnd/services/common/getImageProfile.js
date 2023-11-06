
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Buffer } from 'buffer';
global.Buffer = Buffer;


import { URL_API_BACKEND } from 'react-native-dotenv';

export default async( {setImage, _id} ) => {

    try {

        const valueInCache = JSON.parse( await AsyncStorage.getItem(`ProfileImage.${_id}`) );

        if (valueInCache !== null && valueInCache.expired >= Date.now()) {

            console.log('peguei do cache');
            setImage(valueInCache.base64Image);
            
        } else {

            await AsyncStorage.removeItem(`ProfileImage.${_id}`);

            console.log('n peguei do cache');

            const response = await axios.get(`${URL_API_BACKEND}/getProfileImage/${_id }`);
        
            const buffer = Buffer.from(response.data.imageBuffer, 'binary');
            const base64Image = buffer.toString('base64');

            setImage(base64Image);

            console.log('armazenando');

            const data = {
                base64Image, 
                expired: Date.now() + 5 * 10 * 1000,
            };

            await AsyncStorage.setItem(`ProfileImage.${_id}`, JSON.stringify(data));
            console.log('Dados armazenados temporariamente no cache com sucesso.');
            
        }

    } catch (error) {
        console.log(error);
    }

    return ;
}
