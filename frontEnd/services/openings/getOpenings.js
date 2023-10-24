
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import desconecta from '../login/desconecta';

export default async({setloading, user, setOpenings, setCurrentPage, }) => {

    setloading(true)

    try {
        
        const response = await axios.post('http://192.168.18.154:3024/openings', user);
        const openings = await jwtDecode(response.data.token).openings;
        const error = await jwtDecode(response.data.token).error;

        if ( error ){

            desconecta({...{setloading, setCurrentPage, }});

        }else{

            setOpenings(openings);

        }

    } catch (error) {

        console.error(error);
        desconecta({...{setloading, setCurrentPage, }});
        
    }

    setloading(false)
    
    return ;
}
