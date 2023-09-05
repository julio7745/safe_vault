
import { useEffect, useState, } from 'react';
import { View, Text, StyleSheet, Keyboard , } from 'react-native';

import UserField from './formFields/user'
import PasswordField from './formFields/password'
import SubmitField from './formFields/submit'

export default formLogin = ({ setcurrentPage, setId }) => {

  let inputRefs = {}

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        unselectField
    );
    return () => keyboardDidHideListener.remove();
  }, []);

  const unselectField = () => {
    Object.values(inputRefs).forEach((inputRef) => inputRef.current.blur());
    Keyboard.dismiss();
  };

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [userErrors, setUserErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);

  return (
    <View style={styles.loginForm}>
      <Text style={styles.titleForm}>Login</Text>
      <UserField {...{inputRefs, setUser, userErrors}}/>
      <PasswordField {...{inputRefs, setPassword, passwordErrors}}/>
      <SubmitField {...{ user, password,  setcurrentPage, setId, setUserErrors, setPasswordErrors}}/>
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