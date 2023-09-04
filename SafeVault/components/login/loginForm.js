import React, { useEffect  } from 'react';
import { View, Text, StyleSheet, Keyboard , } from 'react-native';

import UserField from './formFields/user'
import PasswordField from './formFields/password'
import SubmitField from './formFields/submit'
import password from './formFields/password';

export default formLogin = ({ setcurrentPage, setUser }) => {

  let inputRefs = {refs: []}

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        unselectField
    );
    return () => keyboardDidHideListener.remove();
  }, []);

  const unselectField = () => {
    Object.values(inputRefs.refs).forEach((inputRef) => inputRef.current.blur());
    Keyboard.dismiss();
  };

  return (
    <View style={styles.loginForm}>
      <Text style={styles.titleForm}>Login</Text>
      <UserField inputRefs={inputRefs}/>
      <PasswordField inputRefs={inputRefs}/>
      <SubmitField/>
    </View>
  );

};

const styles = StyleSheet.create({
  loginForm:{
    padding: 25,
    borderRadius: 10,
    backgroundColor: '#305E69',
  },
  titleForm: {
    marginTop: -10,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
});