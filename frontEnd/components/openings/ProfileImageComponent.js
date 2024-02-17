
import { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default ({ userOfOpening, setImagesLoading }) => {
  
  const [image, setImage] = useState();

  useEffect(() => {
    
    setImagesLoading(prevImagesLoading => [
        ...prevImagesLoading, 
        { setImage, _id: userOfOpening._id }
      ]
    );
    
  }, []);

  return (
    <View>
        { image && ( <Image 
            source={{ uri: image }}
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
