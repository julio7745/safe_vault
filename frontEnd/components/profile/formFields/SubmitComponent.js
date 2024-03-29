
import { View, StyleSheet, Image, TouchableWithoutFeedback, } from 'react-native';

import login from '../../../services/login/login'

export default ({ 
  userValue,
  passwordValue,
  setUserErrors,
  setPasswordErrors,
  setCurrentPage,
  setUser,
  setloading,
  inputRefs
}) => {
  
  return (
    <View style={styles.campBtnLogin}>
        <TouchableWithoutFeedback 
          onPress={() => {

            Object.values(inputRefs).forEach((inputRef) => inputRef.current.blur());     
            
            login({ userValue, 
              passwordValue, 
              setUserErrors, 
              setPasswordErrors, 
              setCurrentPage, 
              setUser,
              setloading,
            })}
          }>
          <Image source={require('../../../assets/icons/login/login.png')} style={styles.btnLogin}/>
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