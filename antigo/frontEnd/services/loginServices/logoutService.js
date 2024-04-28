
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async({
    setCurrentPage,
    setLoading,
    setUser
  }) => {

  setLoading(true)

  await AsyncStorage.clear();
  setCurrentPage('login')
  setUser({
    name: '',
    lastName: '',
    _id: '',
  })

  setLoading(false)
  
  return ;
  
}
