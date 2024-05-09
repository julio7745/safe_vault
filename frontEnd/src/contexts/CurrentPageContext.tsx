
import { createContext, useState } from 'react';

const CurrentPageContext = createContext({});

const CurrentPageProvider = ({ children }) => {
  
  const [currentPage, setCurrentPage] = useState('openings');

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
  
};

export { CurrentPageProvider, CurrentPageContext };