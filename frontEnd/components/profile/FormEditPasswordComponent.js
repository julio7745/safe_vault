
import { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Image, Keyboard, Text } from 'react-native';

import updatePassword from '../../services/profileServices/updatePasswordService';

export default ({ user, setCurrentPage, setLoading, }) => {

  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);

  const [formValue, setFormValue] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [formErros, setformErros] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

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
          onChangeText={(text)=>setFormValue({
            currentPassword: text,
            newPassword: formValue.newPassword,
            confirmNewPassword: formValue.confirmNewPassword
          })}
        />
        { formErros.currentPassword ? <Text style={styles.error}>{formErros.currentPassword}</Text> : null }
        <TextInput
          style={styles.input}
          ref={newPasswordRef}
          placeholder="New Password"
          autoComplete="off"
          maxLength={15}
          onChangeText={(text)=>setFormValue({
            currentPassword: formValue.currentPassword,
            newPassword: text,
            confirmNewPassword: formValue.confirmNewPassword
          })}
        />
        { formErros.newPassword ? <Text style={styles.error}>{formErros.newPassword}</Text> : null}
        <TextInput
          style={styles.input}
          ref={confirmNewPasswordRef}
          placeholder="Confirm New Password"
          autoComplete="off"
          maxLength={15}
          onChangeText={(text)=>setFormValue({
            currentPassword: formValue.currentPassword,
            newPassword: formValue.newPassword,
            confirmNewPassword: text
          })}
        />
        { formErros.confirmNewPassword ? <Text style={styles.error}>{formErros.confirmNewPassword}</Text> : null }
        <TouchableWithoutFeedback 
          onPress={() => {
            unselectField()
            updatePassword({
              formValue,
              user,
              setLoading,
              setCurrentPage,
              formErros, setformErros,
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