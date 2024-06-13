
import { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const URL_API_BACKEND = 'http://192.168.100.6:3000';

const CurrentPageContext = createContext({});

const CurrentPageProvider = ({ children }) => {

  const [currentPage, _setCurrentPage] = useState('login');

  const setCurrentPage = async (page: string) => {

    if (page === 'login') return _setCurrentPage(page);

    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `${token}`,
    };

    await axios.get(`${URL_API_BACKEND}/login/verify`, { headers })
    .then(() => _setCurrentPage(page))
    .catch(() => {
      AsyncStorage.removeItem('token');
      _setCurrentPage('login');
    });

  };

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
};

const useCurrentPage = () => useContext(CurrentPageContext);

export { CurrentPageProvider, useCurrentPage, CurrentPageContext };
