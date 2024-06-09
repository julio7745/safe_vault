

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
const URL_API_BACKEND = 'http://192.168.100.6:3000';

const post = async (path: string, body?: unknown) => {

  try {

    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `${token}`,
    };

    const response = await axios.post(
      `${URL_API_BACKEND}/${path}`,
      body,
      { headers }
    );
    return response;

  } catch (error) {
    throw error;
  }
}
    
const get = async (path: string) => {
    
  try {
      
    const token = await AsyncStorage.getItem('token') || "";
        
    const headers = {
      Authorization: `${token}`,
    };
          
    const response = await axios.get(`${URL_API_BACKEND}/${path}`, { headers });
    return response;
    
  } catch (error) {
    throw error;
  }
}

export default { post, get}