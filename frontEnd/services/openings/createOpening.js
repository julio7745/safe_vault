
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import logout from '../login/logout';

export default async({setloading, user, setCurrentPage, }) => {

    setloading(true)

    try {
        
        const response = await axios.post('http://192.168.18.154:3024/createOpening', user);
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
