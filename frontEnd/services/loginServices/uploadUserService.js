
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async ({ name,  lastName, _id, password, }) =>{
    
    try {
        
        await AsyncStorage.setItem('user', JSON.stringify({
            name, lastName, _id, password, 
        }));
        
    } catch (error) {
        console.error(`uploadUserService: ${error}`);
    }

    return;

}
