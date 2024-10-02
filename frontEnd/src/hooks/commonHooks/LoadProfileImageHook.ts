
import HttpRequestHook from './HttpRequestHook';

export default () => {

  const httpRequestServices = HttpRequestHook()

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

      await httpRequestServices.post('imageProfile/load', {name, lastName})
      .then(async (response) => {
        setImage({ profileImage: response.data.profileImage, profileImageExtension: response.data.profileImageExtension})
      })
          
    }
  }

  return LoadProfileImageHook
    
};
