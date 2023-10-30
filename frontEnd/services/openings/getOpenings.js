
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import logout from '../login/logout';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async({setloading, user, setOpenings, setCurrentPage, }) => {

    setloading(true)

    try {

        const response = await axios.post(`${URL_API_BACKEND}/openings`, user);
        const openings = await jwtDecode(response.data.token).openings;
        const error = await jwtDecode(response.data.token).error;

        if ( error ){

            logout({...{setloading, setCurrentPage, }});

        }else{

            setOpenings(openings);

        }

    } catch (error) {

        console.error(error);
        logout({...{setloading, setCurrentPage, }});
        
    }

    setloading(false)
    
    return ;
}
