
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async( {props} ) => {

  props.setloading(true)

  await AsyncStorage.clear();
  props.setCurrentPage('login')

  props.setloading(false)
  
  return ;
  
}
