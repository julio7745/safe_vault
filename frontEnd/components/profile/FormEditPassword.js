
import { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Image, Keyboard, Text } from 'react-native';

import updatePassword from '../../services/profile/updatePassword';

export default ({user, setCurrentPage, setloading, }) => {

  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);

  const [currentPasswordValue, setCurrentPasswordValue] = useState('123456Aa');
  const [newPasswordValue, setNewPasswordValue] = useState('123456Aa');
  const [confirmNewPasswordValue, setConfirmNewPasswordValue] = useState('123456Aa');

  const [currentPasswordErrors, setCurrentPasswordErrors] = useState('');
  const [newPasswordErrors, setNewPasswordErrors] = useState('');
  const [confirmNewPasswordErrors, setConfirmNewPasswordErrors] = useState('');

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      unselectField
    );
    return () => keyboardDidHideListener.remove();
  }, []);

  const unselectField = () => {
    currentPasswordRef.current.blur();
    newPasswordRef.current.blur();
    confirmNewPasswordRef.current.blur();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.EditPasswordForm}>
        <TextInput
          style={styles.input}
          ref={currentPasswordRef}
          placeholder="Currente Password"
          autoComplete="off"
          maxLength={15}
          value={currentPasswordValue}
          onChangeText={(text)=>setCurrentPasswordValue(text)}
        />
        { currentPasswordErrors ? <Text style={styles.error}>{currentPasswordErrors}</Text> : null }
        <TextInput
          style={styles.input}
          ref={newPasswordRef}
          placeholder="New Password"
          autoComplete="off"
          maxLength={15}
          value={newPasswordValue}
          onChangeText={(text)=>setNewPasswordValue(text)}
        />
        {newPasswordErrors ? <Text style={styles.error}>{newPasswordErrors}</Text> : null}
        <TextInput
          style={styles.input}
          ref={confirmNewPasswordRef}
          placeholder="Confirm New Password"
          autoComplete="off"
          maxLength={15}
          value={confirmNewPasswordValue}
          onChangeText={(text)=>setConfirmNewPasswordValue(text)}
        />
        { confirmNewPasswordErrors ? <Text style={styles.error}>{confirmNewPasswordErrors}</Text> : null }
        <TouchableWithoutFeedback 
          onPress={() => {
            unselectField()
            updatePassword({
              currentPasswordValue,
              newPasswordValue,
              confirmNewPasswordValue,
              setCurrentPasswordErrors,
              setNewPasswordErrors,
              setConfirmNewPasswordErrors,
              user,
              setloading,
              setCurrentPage,
            })
          }}>
            <Image source={require('../../assets/icons/profile/enviarNovaSenha.png')} style={styles.submit}/>
        </TouchableWithoutFeedback>
      
    </View>
  );

};

const styles = StyleSheet.create({
  EditPasswordForm:{
    width: '95%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1b353b',
    marginTop: 15,
    marginLeft: 10,
    padding: 10,
    marginBottom: 5,
  },
  input:{
    width: '80%',
    backgroundColor: '#ffffff',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  error:{
    color: 'red',
    marginTop: -2,
    marginBottom:4,
    width: '80%',
    fontSize: 12,
  },
  submit:{
    width: 40,
    height: 40,
    borderColor: '#1b353b',
    borderWidth: 2,
    borderRadius: 40,
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -10 }]
}

});