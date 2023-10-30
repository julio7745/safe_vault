
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import logout from '../login/logout';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async({user, setCurrentPage, setloading, setDeletion}) => {

    setloading(true)

    try {

        const response = await axios.post(`${URL_API_BACKEND}/clearOpenings`, user);
        const message = await jwtDecode(response.data.token).message;

        if ( message === 'sucess' ){

            setDeletion('')
            setCurrentPage('home')
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
