
import HttpRequestHook from '@/hooks/commonHooks/HttpRequestHook';

import { useLoading } from '@/contexts/LoadingContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        AsyncStorage.setItem(`imageProfile/${user.name}.${user.lastName}`, JSON.stringify({ 
          profileImage: image.base64,
          profileImageExtension: image.imgExtension,
          expirian: Date.now() + 1000 * 60 * 5
        }))
      })
      .finally(() => {
        setLoading(false);
      });
          
    }
  }

  return EditProfileImageHook
    
};



