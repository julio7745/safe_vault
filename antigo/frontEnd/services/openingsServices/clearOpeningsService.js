
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async({user, setCurrentPage, setLoading, setDeletion}) => {

    setLoading(true)

    try {

        const response = await axios.post(`${URL_API_BACKEND}/opening/clear`,  { data: {}, user } );
        
        const message = await jwtDecode(response.data.token).message;
        const data = await jwtDecode(response.data.token).data;

        // tratamento para NON_EXISTENT_USER_ERROR 
        // tratamento para GERAL_ERROR 


        if ( message === 'OPENING_CLEAR_SUCCESSFUL' ){

            setDeletion('')
            setCurrentPage('home')
            setCurrentPage('openings')

        }

    } catch (error) {
        console.error(`clearOpeningsService: ${error}`);
    }

    setLoading(false)
    
    return ;
}
