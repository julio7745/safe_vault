
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default async({setloading, user, setOpenings}) => {

    setloading(true)

    try {
        
        const response = await axios.post('http://192.168.18.154:3024/openings', user);
        const openings = await jwtDecode(response.data.token).openings;

        setOpenings(openings)

    } catch (error) {

        console.error('Erro:', error);

    }

    setloading(false)
    
    return ;
}
