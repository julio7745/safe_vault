
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async ({ name,  lastName, id, password, }) =>{
    
    try {
        
        await AsyncStorage.setItem('user', JSON.stringify({
            name, lastName, id, password, 
        }));
        
    } catch (error) {
        console.error('Erro:', error);
        //logout({...{setloading, setCurrentPage, }});
    }

    return;

}
