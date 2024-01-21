
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async({
    setCurrentPage,
    setloading,
    setUser
  }) => {

  setloading(true)

  await AsyncStorage.clear();
  setCurrentPage('login')
  setUser({
    name: '',
    lastName: '',
    _id: '',
  })

  setloading(false)
  
  return ;
  
}
