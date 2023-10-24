
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import desconecta from '../login/desconecta';

export default async({setloading, user, setCurrentPage, }) => {

    setloading(true)

    try {
        
        const response = await axios.post('http://192.168.18.154:3024/clearOpenings', user);
        const message = await jwtDecode(response.data.token).message;

        if ( message === 'sucess' ){

            setCurrentPage('home')
            setCurrentPage('openings')

        }else{

            desconecta({...{setloading, setCurrentPage, }});
            
        }

    } catch (error) {

        console.error('Erro:', error);
        desconecta({...{setloading, setCurrentPage, }});

    }

    setloading(false)
    
    return ;
}
