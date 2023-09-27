
import { View, StyleSheet, Image, TouchableWithoutFeedback, } from 'react-native';

import login from '../../../services/login/login'

export default formLogin = ({ userValue, passwordValue, setUserErrors, setPasswordErrors, setCurrentPage, setUser,  }) => {
  
  return (
    <View style={styles.campBtnLogin}>
        <TouchableWithoutFeedback onPress={() => login({ userValue:'julio.carvalho', passwordValue:'123456Aa', setUserErrors, setPasswordErrors, setCurrentPage, setUser, })}>
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
    backgroundColor: '#ffac46',
    borderRadius: 100,
  }
});