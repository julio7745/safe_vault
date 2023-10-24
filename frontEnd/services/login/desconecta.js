
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async({setloading, setCurrentPage, }) => {

    setloading(true)

    await AsyncStorage.removeItem('user');
    setCurrentPage('login')

    setloading(false)
    
    return ;
}
