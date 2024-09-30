
import { createContext, useState, useContext, ReactElement } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const URL_API_BACKEND = 'http://192.168.100.46:3000';

interface CurrentPageContextType {
  currentPage: string;
  setCurrentPage: (page: string) => Promise<void>;
}

const CurrentPageContext = createContext<CurrentPageContextType | undefined>(undefined);

const CurrentPageProvider = ({ children } : { children: ReactElement}) => {

  const [currentPage, _setCurrentPage] = useState<string>('login');

  const setCurrentPage = async (page: string) => {

    if (page === 'login') return _setCurrentPage(page);

    try {

      const token = await AsyncStorage.getItem('token') || '';        
      if (!token) return
      const headers = { 
        Authorization: `${token}`,
      };

      await axios.get(`${URL_API_BACKEND}/login/verify`, { headers })
      .then(() => _setCurrentPage(page))
      
    } catch (error) {
      AsyncStorage.removeItem('token');
      _setCurrentPage('home');
    }

  };

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
};

const useCurrentPage = () => {
  const context = useContext(CurrentPageContext);
  if (context === undefined) {
    throw new Error('useCurrentPage must be used within a CurrentPageProvider');
  }
  return context;
};

export { CurrentPageProvider, useCurrentPage, CurrentPageContext };
