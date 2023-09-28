
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async({setloading, user, setCurrentPage, }) => {

    setloading(true)

    try {
        
        const response = await axios.post('http://192.168.18.154:3024/clearOpenings', user);
        const message = await jwtDecode(response.data.token).message;

        if ( message === 'sucess!' ){

            setCurrentPage('home')
            setCurrentPage('openings')

        }
        if ( message === 'User does not exist!' ){

            await AsyncStorage.removeItem('user');
            setCurrentPage('login')

        }
        console.log(message);

    } catch (error) {

        console.error('Erro:', error);

    }

    setloading(false)
    
    return ;
}
