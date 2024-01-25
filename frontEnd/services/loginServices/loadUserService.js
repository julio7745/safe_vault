
import AsyncStorage from '@react-native-async-storage/async-storage';

import loginService from './loginService.js';

import { propsOfLoginForm } from '../../components/login/FormLoginComponent.js'

export default async ({
    setCurrentPage,
    setLoading,
    setUser,
  }) => {

    setLoading(true);
    
    try {
        
      let user = await AsyncStorage.getItem('user');

      if (user){
          
        await AsyncStorage.removeItem('user')
        user = JSON.parse(user);

        propsOfLoginForm.setLogin({user: `${user.name||''}.${user.lastName||''}`, password: user.password||''})
        
        await loginService({...{
          setCurrentPage,
          setLoading,
          setUser,
          login: propsOfLoginForm.login,
          errors: propsOfLoginForm.errors, setErrors: propsOfLoginForm.setErrors
        }})

      }
        
    } catch (error) {
      console.error('loadUserService:', error);
    }

    setLoading(false);

    return;
}