
import HttpRequestHook from '../commonHooks/HttpRequestHook';

import { useLoading } from '@/contexts/LoadingContext';

export default () => {

  const httpRequestServices = HttpRequestHook()

  const { setLoading } = useLoading();

  const EditProfileImageHook = {

    EditProfileImageService: async ({
      image,
      setEditingImage,
      user,
      setUserData
    }:{
      image: { uri: string, base64: string, imgExtension: string},
      setEditingImage: React.Dispatch<React.SetStateAction<boolean>>,
      user: { name: string, lastName: string, profileImage: string, profileImageExtension: string}
      setUserData:React.Dispatch<React.SetStateAction<{ name: string, lastName: string, profileImage: string, profileImageExtension: string}>>
    }) => {

      setLoading(true);

      await httpRequestServices.post('imageProfile/updateImage', image)
      .then(() => {
        setEditingImage(false)
        setUserData({ name: user.name, lastName: user.lastName, profileImage: image.base64, profileImageExtension: image.imgExtension})
      })
      .catch(error => {
  
      })
      .finally(() => {
        setLoading(false);
      });
          
    }
  }

  return EditProfileImageHook
    
};



