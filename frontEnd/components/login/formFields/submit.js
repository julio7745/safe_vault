
import { View, StyleSheet, Image, TouchableWithoutFeedback, } from 'react-native';

import login from '../../../services/login/login'

export default formLogin = ({user, password, setcurrentPage, setId, setUserErrors, setPasswordErrors }) => {
  
  return (
    <View style={styles.campBtnLogin}>
        <TouchableWithoutFeedback onPress={() => login( user, password, setcurrentPage, setId, setUserErrors, setPasswordErrors )}>
          <Image source={require('../../../assets/icons/login.png')} style={styles.btnLogin}/>
        </TouchableWithoutFeedback>
    </View>
  );
  
};

const styles = StyleSheet.create({
  campBtnLogin:{
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  btnLogin:{
    width: 200,
    height: 40,
    resizeMode: 'contain',
    backgroundColor: '#E8A66B',
    borderRadius: 100,
  }
});