
import { useCurrentPage } from '@/contexts/CurrentPageContext';

import LogoutService from '@/services/commonSevices/LogoutService';

const LogoutHook = () => {
  
  const { setCurrentPage } = useCurrentPage();

  const logout = async () => {
    LogoutService({setCurrentPage})
  };

  return logout;
};

export default LogoutHook;
