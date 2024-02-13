
import { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import getImageProfile from '../../services/commonServices/getImageProfileService';

export default ({ user, profileImage, setProfileImage }) => {

  useEffect(() => {
    
    getImageProfile( { setImage: setProfileImage, _id: user._id, user } );

  }, []);

  return (
    <View>
        { profileImage && ( <Image 
            source={{ uri: profileImage }}
            style={styles.imageUser} 
        />)}
        { !profileImage && ( <Image 
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
    borderWidth: 2,
    margin: 'auto',
  }
});
