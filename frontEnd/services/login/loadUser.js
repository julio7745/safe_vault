
import AsyncStorage from '@react-native-async-storage/async-storage';

import login from './login';
import {setUserErrors, setPasswordErrors, setUserValue, setPasswordValue} from '../../components/login/loginForm'

export default async ({setCurrentPage, setUser, setloading, }) => {

    setloading(true);
    
    try {
        
        let user = await AsyncStorage.getItem('user');

        if (user){
            
            await AsyncStorage.removeItem('user')
            user = JSON.parse(user);

            setUserValue(`${user.name||''}.${user.lastName||''}`)
            setPasswordValue(user.password||'')
            
            await login({ userValue: `${user.name||''}.${user.lastName||''}`,
                    passwordValue: user.password||'', 
                    setCurrentPage, 
                    setUser,
                    setUserErrors,
                    setPasswordErrors, 
            })

            setloading(false);
            
        }
        
    } catch (error) {
        console.error('Erro:', error);
    }

    setloading(false);

    return;
}