
import AsyncStorage from '@react-native-async-storage/async-storage';

import login from './login';
import {setUserErrors, setPasswordErrors} from '../../components/login/loginForm'

export default async ({setCurrentPage, setUser, }) => {

    try {
        
        let user = await AsyncStorage.getItem('user');

        if (user){
            
            await AsyncStorage.removeItem('user')
            user = JSON.parse(user);
            
            login({ userValue: `${user.name||''}.${user.lastName||''}`,
                    passwordValue: user.password||'', 
                    setCurrentPage, 
                    setUser,
                    setUserErrors,
                    setPasswordErrors, 
            })
            
        }
        
    } catch (error) {
        console.error('Erro:', error);
    }

    return;
}