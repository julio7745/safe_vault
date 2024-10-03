
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpRequestHook from './HttpRequestHook';

export default () => {

  const httpRequestServices = HttpRequestHook()

  const LoadProfileImageHook = {

    Load: async (
      { name, lastName } : { 
        name: string,
        lastName: string
      }
    ) => {

      const valueInCache = JSON.parse(await AsyncStorage.getItem(`imageProfile/${name}.${lastName}`) || 'null');

      if (valueInCache && valueInCache.expirian > Date.now()) return valueInCache

      AsyncStorage.removeItem(`imageProfile/${name}.${lastName}`)

      const response = await httpRequestServices.post('imageProfile/load', {name, lastName})
      AsyncStorage.setItem(`imageProfile/${name}.${lastName}`, JSON.stringify({ 
        profileImage: response.data.profileImage,
        profileImageExtension: response.data.profileImageExtension,
        expirian: Date.now() + 1000 * 60 * 5
      }))
      return { profileImage: response.data.profileImage, profileImageExtension: response.data.profileImageExtension}

    }

  }

  return LoadProfileImageHook
    
};
