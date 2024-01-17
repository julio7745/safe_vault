
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import logout from '../login/logout';

import { URL_API_BACKEND } from 'react-native-dotenv';

export default async({setloading, user, setUsers, setCurrentPage, }) => {

    setloading(true)

    try {

        const response = await axios.post(`${URL_API_BACKEND}/getUsers`, user);
        const users = await jwtDecode(response.data.token).users;
        const error = await jwtDecode(response.data.token).error;

        if ( error ){

            logout({...{setloading, setCurrentPage, }});

        }else{
            
            setUsers(users);
            
        }

    } catch (error) {
        console.error(`getUser: ${error}`);
        //logout({...{setloading, setCurrentPage, }});
    }

    setloading(false)
        
    return ;
}
