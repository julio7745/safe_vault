

import AsyncStorage from '@react-native-async-storage/async-storage';

import HttpRequestHook from '../commonHooks/HttpRequestHook';

import ValidateLoginFormService from '@/services/loginServices/ValidateLoginFormService';

import { useCurrentPage } from '@/contexts/CurrentPageContext';
import { useLoading } from '@/contexts/LoadingContext';

import LogoutService from '@/services/commonSevices/LogoutService';

export default () => {

  const httpRequestServices = HttpRequestHook()

  const { setCurrentPage } = useCurrentPage();
  const { setLoading } = useLoading();

  const loginHook = {

    login: async ({
      setErrors,
      login
    } : {
      setErrors: React.Dispatch<React.SetStateAction<{user: string[], password: string[]}>>,
      login:{ user: string, password: string }
    }) => {

      setLoading(true);
    
      const validate = ValidateLoginFormService({ login });
      if (validate.erros)  { 
        setErrors(validate.erros);
        setLoading(false);
        return
      }  

      await httpRequestServices.post(`login`, {name: validate.name, lastName: validate.lastName, password: validate.password})
      .then(async response => {
        setErrors({ user: [], password: [] });
        await AsyncStorage.setItem('token', JSON.stringify( response.data.token ));
        await AsyncStorage.setItem('user', JSON.stringify( { 
          name: response.data.user.name, 
          lastName: response.data.user.lastName 
        }));
        setCurrentPage('home')
      })
      .catch(error => {

        if (error.response.data.errors[0] === 'INCORRECT_USER'){
          return setErrors({ user: ['● User does not exist!'], password: [] });
        } 
          
        else if (error.response.data.errors[0] === 'INCORRECT_PASSWORD') {
          return setErrors({ user: [], password: ['● Incorrect password!'] });
        } 

        else {
          return setErrors({ user: [], password: ['● Internal Error!'] });
        }

      })
      .finally(() => {
        return setLoading(false);
      });

    },
    autoLogin: async () => {

      setLoading(true);
  
      await httpRequestServices.get(`login/verify`)
      .then(() => setCurrentPage('home'))
      .catch(() => setCurrentPage('login'))
      .finally(() => setLoading(false));
      return;
  
    },
    logout: async () => {
      LogoutService({setCurrentPage})
    }

  }

  return loginHook
    
};



