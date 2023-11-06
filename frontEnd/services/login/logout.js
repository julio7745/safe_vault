
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async({setloading, setCurrentPage, }) => {

    setloading(true)

    await AsyncStorage.clear();
    setCurrentPage('login')

    setloading(false)
    
    return ;
}
