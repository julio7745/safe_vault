
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import logout from '../loginServices/logoutService';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async(props) => {

    props.setloading(true)

    try {

        const response = await axios.post(`${URL_API_BACKEND}/createOpening`, props.user);
        const message = await jwtDecode(response.data.token).message;

        if ( message === 'sucess' ){

            props.setCurrentPage('openings')

        }else{

            logout({...{setloading, setCurrentPage, }});
            
        }

    } catch (error) {
        console.error('Erro:', error);
    }

        props.setloading(false)
    
    return ;
}
