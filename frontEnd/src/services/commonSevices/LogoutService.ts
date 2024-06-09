

import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({setCurrentPage} : { setCurrentPage: React.Dispatch<React.SetStateAction<string>> }) => {

  AsyncStorage.removeItem('token');
  setCurrentPage('login')

}
