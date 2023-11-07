
import { useEffect } from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, Image, Text} from 'react-native';

import ProfileImage from '../components/profile/ProfileImage.js'; 
import FormEditPassword from '../components/profile/FormEditPassword.js';

export default ({user, setCurrentPage, setloading, }) => {

  useEffect( () => {
    
  }, []);

  return (
    <View style={styles.containProfile}>
        <View style={styles.profile}>
          <View style={styles.containerProfileImage}>
            <ProfileImage {...{ _id: user.id, }}/>
            <TouchableWithoutFeedback onPress={ ()=> console.log('aqui eu vou editar a ft')}>
              <Image source={require('../assets/icons/profile/editar.png')} style={styles.btnEditImageProfile}/>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.containerUserData}>
          <Text>
            <Text style={styles.strong}>User Name: </Text>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}
          </Text>
          <Text>
            <Text style={styles.strong}>User Lastname: </Text>{user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
          </Text>
        </View>
        <View style={styles.containerUserData}>
          <Text style={styles.strong}>Edit Password</Text>
          <FormEditPassword {...{user, setCurrentPage, setloading, }}/>
        </View>
        <View style={styles.containerUserData}>
          <Text style={styles.strong}>Delete my Account</Text>
          <View style={styles.containerbtnDeleteAccount}>
            <TouchableWithoutFeedback onPress={() => console.log('aqui eu vou apagr o usuario')}>
              <View style={styles.btnDeleteAccount}>
                <Image source={require('../assets/icons/common/clear.png')} style={styles.icoDeleteAccount}/>
              </View>
            </TouchableWithoutFeedback>
          </View>
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
  },
  profile: {
    height: '100%',
    width: '100%',
    backgroundColor: '#4687975b',
    display: 'flex',
    alignItems: 'center',
  },
  containerProfileImage:{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 5,
    margin: 15,
  },
  btnEditImageProfile:{
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#1b353b',
    borderRadius: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    left: '64%',
    top: '70%'
  },
  containerUserData:{
    borderTopWidth: 1,
    borderColor: '#ffffff',
    padding: 15,
    paddingLeft: 15,
    width: '90%',
  }, 
  containerbtnDeleteAccount:{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  btnDeleteAccount:{
    marginTop: 15,
    borderRadius: 10,
    borderColor: '#ffffff',
    borderWidth: 1,
    width: '60%',
    height: 50,
    backgroundColor: '#b10000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },icoDeleteAccount:{
    width: 40,
    height: 40,
  },
  strong:{
    fontWeight: 'bold',
  }
});
