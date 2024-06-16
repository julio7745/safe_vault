
import { createContext, useState, useContext, ReactElement, Dispatch, SetStateAction } from 'react';

interface LoadingContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const LoadingProvider = ({ children } : { children: ReactElement }) => {
  
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
  
};

const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useCurrentPage must be used within a CurrentPageProvider');
  }
  return context;
};

export { LoadingProvider, LoadingContext, useLoading};