
import httpRequestService from '@/services/commonSevices/httpRequestService';
import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CurrentPageContext = createContext({});

const CurrentPageProvider = ({ children }) => {

  const [currentPage, _setCurrentPage] = useState('login');

  const setCurrentPage = async (page:string) => {

    if (page === 'login') return _setCurrentPage(page)

    await httpRequestService.get(`login/verify`)
    .then( () => _setCurrentPage(page))
    .catch( () => { 
      AsyncStorage.removeItem('token');
      _setCurrentPage('login')
    })
  } 

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
  
};

export { CurrentPageProvider, CurrentPageContext };