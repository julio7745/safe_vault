import { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import getImageProfile from '../../services/commonServices/getImageProfileService.js';

export default ({ userOfOpening, user}) => {
  
  const [image, setImage] = useState();

  useEffect(() => {
    
    getImageProfile({_id: userOfOpening._id, setImage, user})

  }, []);

  return (
    <View>
        { image && ( <Image 
            source={{ uri: `data:image/jpeg;base64,${image}` }}
            style={styles.imageUser} 
        />)}
        { !image && ( <Image 
            source={require('../../assets/icons/navBar/perfil.png')} 
            style={styles.imageUser}
        />)}
    </View>
  );
};

const styles = StyleSheet.create({
  imageUser: {
    height: 65,
    width: 65,
    borderRadius: 65,
    backgroundColor: '#1b353b',
    borderColor: '#ffffff',
    borderWidth: 1,
  }
});
