
import AsyncStorage from '@react-native-async-storage/async-storage';

exports.load = async (setCurrentPage) => {

    try {
        console.log('O aplicativo foi iniciado.');
        const user = await AsyncStorage.getItem('user');
        if (user){
            console.log(user);
            setCurrentPage('home');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
      
    return;
}

