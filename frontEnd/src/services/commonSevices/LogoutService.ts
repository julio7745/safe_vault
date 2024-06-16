

import AsyncStorage from '@react-native-async-storage/async-storage';

export default async ({setCurrentPage} : { setCurrentPage: (page: string) => Promise<void> }) => {

  await AsyncStorage.removeItem('token');
  setCurrentPage('login')

}
