
import axios from 'axios';
import { Buffer } from 'buffer';
global.Buffer = Buffer;
import base64 from 'base-64';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async( {setImage, _id} ) => {

    try {

        const response = await axios.get(`${URL_API_BACKEND}/getProfileImage/${_id }`);
        
        const buffer = Buffer.from(response.data.imageBuffer, 'binary');
        const base64Image = buffer.toString('base64');
        setImage(base64Image);

    } catch (error) {
        console.log(error);
    }

    return ;
}
