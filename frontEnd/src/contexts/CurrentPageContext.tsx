
import httpRequestService from '@/services/commonSevices.ts/httpRequestService';
import { createContext, useState } from 'react';

const CurrentPageContext = createContext({});

const CurrentPageProvider = ({ children }) => {
  
  const defaultPage = 'login'

  const [currentPage, _setCurrentPage] = useState(defaultPage);

  const setCurrentPage = async (page:string) => {

    if (page === defaultPage) return _setCurrentPage(page)

    await httpRequestService.get(`login/verify`)
    .then( () => _setCurrentPage(page))
    .catch( (err) => { 
      _setCurrentPage(defaultPage)
      console.error(err);
    })
  } 

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
  
};

export { CurrentPageProvider, CurrentPageContext };