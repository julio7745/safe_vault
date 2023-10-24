
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import desconecta from '../login/desconecta';

export default async({setDeletion, user, setloading, setCurrentPage, openingId }) => {

    setloading(true)

    try {
        
        const response = await axios.post('http://192.168.18.154:3024/deleteOpening', {...user, ...{openingId}});
        const message = await jwtDecode(response.data.token).message;

        if ( message === 'sucess' ){

            setDeletion('')
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
