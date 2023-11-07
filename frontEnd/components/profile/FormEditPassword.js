
import { useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Image, Keyboard, } from 'react-native';

export default ({user, setCurrentPage, setloading, }) => {

  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);

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
        />
        <TextInput
          style={styles.input}
          ref={newPasswordRef}
          placeholder="New Password"
          autoComplete="off"
          maxLength={15}
        />
        <TextInput
          style={styles.input}
          ref={confirmNewPasswordRef}
          placeholder="Confirm New Password"
          autoComplete="off"
          maxLength={15}
        />
        <TouchableWithoutFeedback>
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