
import AsyncStorage from '@react-native-async-storage/async-storage';

exports.upload = async ({ name,  lastName, id, }) =>{
    
    try {
        
        await AsyncStorage.setItem('user', JSON.stringify({
            name,  lastName, id,
        }));
        
    } catch (error) {
        console.error('Erro:', error);
    }

    return;

}

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

