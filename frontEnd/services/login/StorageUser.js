
import AsyncStorage from '@react-native-async-storage/async-storage';

exports.load = async ({setCurrentPage, setUser, }) => {

    try {
        
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        
        if (user){
            console.log(user);
            setUser(user);
            setCurrentPage('home');
        }
        
    } catch (error) {
        console.error('Erro:', error);
    }
      
    return;
}

