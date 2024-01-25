
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async({user, setCurrentPage, setLoading, setDeletion, openingId}) => {

    setLoading(true)
    console.log('apagou');
    
    /*
    try {

        const response = await axios.post(`${URL_API_BACKEND}/deleteOpening`, {...user, ...{openingId}});
        const message = await jwtDecode(response.data.token).message;

        if ( message === 'sucess' ){

            setDeletion('')
            setCurrentPage('home')
            setCurrentPage('openings')

        }else{

            logout({...{setLoading, setCurrentPage, }});
            
        }

    } catch (error) {
        console.error('Erro:', error);
        //logout({...{setLoading, setCurrentPage, }});
    }*/

    setLoading(false)
    
    return ;
}
