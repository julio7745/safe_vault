
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { useCurrentPage } from '@/contexts/CurrentPageContext';

import LogoutService from '@/services/commonSevices/LogoutService';

const URL_API_BACKEND = 'https://safe-vault.onrender.com';

export default () => {

  const { setCurrentPage } = useCurrentPage();

  const httpRequestHook = {

    get: async (path: string) => {

      try {

        const token = await AsyncStorage.getItem('token') || '';        
      
        const headers = { 
          Authorization: `${token}`,
        };
        
        const response = await axios.get(`${URL_API_BACKEND}/${path}`, { headers });
        return response;

      } catch ( error: any ) {

        if ( !error.response.data.errors || !Array.isArray(error.response.data.errors) ) { 
          console.error(error); 
          error.response = { data: { errors: ['INTERNAL_ERROR'] } };
        }
      
        if ( error.response.data.errors[0] === 'UNAUTHORIZED' ) {
          console.error('UNAUTHORIZED');
          LogoutService({setCurrentPage})
        }
      
        throw error

      }
    },
    post: async (path: string, body: unknown) => {

      try {

        const token = await AsyncStorage.getItem('token') || '';        
      
        const headers = { 
          Authorization: `${token}`,
        };
        
        const response = await axios.post(`${URL_API_BACKEND}/${path}`, body, { headers });
        return response;

      } catch ( error: any ) {

        if ( !error.response.data.errors || !Array.isArray(error.response.data.errors) ) { 
          console.error(error); 
          error.response = { data: { errors: ['INTERNAL_ERROR'] } };
        }
      
        if ( error.response.data.errors[0] === 'UNAUTHORIZED' ) {
          console.error('UNAUTHORIZED');
          LogoutService({setCurrentPage})
        }
      
        throw error

      }
    }
  }

  return httpRequestHook
    
};
