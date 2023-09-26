
import AsyncStorage from '@react-native-async-storage/async-storage';

exports.load = async ({setCurrentPage, setUser, }) => {

    try {
        
        const user = await AsyncStorage.getItem('user');
        if (user){
            setUser(user);
            setCurrentPage('home');
        }
        
    } catch (error) {
        console.error('Erro:', error);
    }
      
    return;
}

