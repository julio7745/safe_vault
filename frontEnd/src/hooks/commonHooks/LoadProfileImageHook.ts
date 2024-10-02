
import HttpRequestHook from './HttpRequestHook';

import { useLoading } from '@/contexts/LoadingContext';

export default () => {

  const httpRequestServices = HttpRequestHook()

  const { setLoading } = useLoading();

  const LoadProfileImageHook = {

    LoadProfileImageService: async (
      { name, lastName, setImage } : { 
        name: string,
        lastName: string,
        setImage: (args: { 
          profileImage: string, 
          profileImageExtension: string 
        }) => void 
      }
    ) => {

      setLoading(true);
      await httpRequestServices.post('imageProfile/load', {name, lastName})
      .then(async (response) => {
        setImage({ profileImage: response.data.profileImage, profileImageExtension: response.data.profileImageExtension})
      })
      .finally(() => {
        setLoading(false);
      });
          
    }
  }

  return LoadProfileImageHook
    
};
