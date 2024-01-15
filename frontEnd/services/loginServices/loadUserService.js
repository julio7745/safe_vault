
import AsyncStorage from '@react-native-async-storage/async-storage';

import loginService from './loginService.js';

export default async ({ props }) => {

    props.setloading(true);
    
    try {
        
        let user = await AsyncStorage.getItem('user');
        console.log(user);

        if (user){
            
            await AsyncStorage.removeItem('user')
            user = JSON.parse(user);
            
            props.log
            setUserValue(`${user.name||''}.${user.lastName||''}`)
            setPasswordValue(user.password||'')
            
            await loginService({ userValue: `${user.name||''}.${user.lastName||''}`,
                passwordValue: user.password||'', 
                setCurrentPage, 
                setUser,
                setUserErrors,
                setPasswordErrors, 
                setloading,
            })
        }
        
    } catch (error) {
        console.error('Erro:', error);
    }

    props.setloading(false);

    return;
}