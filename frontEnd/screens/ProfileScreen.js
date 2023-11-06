
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

import ProfileImage from '../components/profile/ProfileImage.js'; 

export default ({user, setloading, TouchableWithoutFeedback}) => {

  useEffect( () => {
    
  }, []);

  return (
    <View style={styles.containProfile}>
        <View style={styles.profile}>
          <View style={styles.containerProfileImage}>
            <ProfileImage {...{ _id: user.id, setloading, }}/>
            <TouchableWithoutFeedback onPress={ ()=> console.log('aqui eu vou editar a ft')}>
              
            </TouchableWithoutFeedback>
          </View>
        </View>

    </View>
  );
  
};

const styles = StyleSheet.create({
    containProfile: {
    height: '82%',
    width: '100%',
    backgroundColor: '#ffffff',
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
    },
  profile: {
    height: '100%',
    width: '100%',
    backgroundColor: '#4687975b',
  },
  containerProfileImage:{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 5,
  }
});
