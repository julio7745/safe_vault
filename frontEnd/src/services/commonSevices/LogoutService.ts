

import AsyncStorage from '@react-native-async-storage/async-storage';

export default async ({setCurrentPage} : { setCurrentPage: React.Dispatch<React.SetStateAction<string>> }) => {

  await AsyncStorage.removeItem('token');
  setCurrentPage('login')

}
