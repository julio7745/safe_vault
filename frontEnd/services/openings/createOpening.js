
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import logout from '../login/logout';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async({setloading, user, setCurrentPage, }) => {

    setloading(true)

    try {

        console.log(`${URL_API_BACKEND}/createOpening`);

        const response = await axios.post(`${URL_API_BACKEND}/createOpening`, user);
        const message = await jwtDecode(response.data.token).message;

        if ( message === 'sucess' ){

            setCurrentPage('openings')

        }else{

            logout({...{setloading, setCurrentPage, }});
            
        }

    } catch (error) {

        console.error('Erro:', error);
        logout({...{setloading, setCurrentPage, }});

    }

    setloading(false)
    
    return ;
}
