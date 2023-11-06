
import { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import getImageProfile from '../../services/common/getImageProfile';

export default ({ _id, }) => {
  
  const [image, setImage] = useState();

  useEffect(() => {
  
    getImageProfile({_id, setImage});

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
    height: 170,
    width: 170,
    borderRadius: 170,
    backgroundColor: '#1b353b',
    borderColor: '#ffffff',
    borderWidth: 1,
    margin: 'auto',
  }
});
