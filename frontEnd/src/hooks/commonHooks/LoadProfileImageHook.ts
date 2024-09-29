
import HttpRequestHook from './HttpRequestHook';

import { useLoading } from '@/contexts/LoadingContext';

export default () => {

  const httpRequestServices = HttpRequestHook()

  const { setLoading } = useLoading();

  const LoadProfileImageHook = {

    LoadProfileImageService: async (
      { name, lastName, setUserData, user}:
      { 
        name: string,
        lastName: string,
        setUserData: React.Dispatch<React.SetStateAction<{ name: string, lastName: string, profileImage: string, profileImageExtension: string}>>,
        user: { name: string, lastName: string, profileImage: string, profileImageExtension: string}
      }) => {

      setLoading(true);

      await httpRequestServices.post('imageProfile/load', {name, lastName})
      .then(async (response) => {
        setUserData({ name, lastName, profileImage: response.data.profileImage, profileImageExtension: response.data.profileImageExtension})
      })
      .catch(error => {
        
      })
      .finally(() => {
        setLoading(false);
      });
          
    }
  }

  return LoadProfileImageHook
    
};



