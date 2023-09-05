
import { useState, useRef, } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableWithoutFeedback, } from 'react-native';

export default LoginScreen = ({inputRefs, setPassword}) => {
  
  inputRefs.passwordField = useRef(null)
  const selectpasswordField = () => {
    inputRefs.passwordField.current.focus();
  }
  
  const [displayPassword, setdisplayPassword] = useState(true);
  const handleDisplayPassword = () => {
    inputRefs.passwordField.current.focus();
    setdisplayPassword(!displayPassword)
  }

  return (
    <View style={styles.field}>
      <TouchableWithoutFeedback onPress={selectpasswordField}>
        <Image source={require('../../../assets/icons/password.png')} style={styles.icon} />
      </TouchableWithoutFeedback>
      <TextInput
        style={styles.input}
        secureTextEntry={displayPassword}
        placeholder="Password"
        autoComplete="off"
        ref={inputRefs.passwordField}
        onChangeText={(text) => setPassword(text)}
        maxLength={15}
      />
      <TouchableWithoutFeedback onPress={handleDisplayPassword}>
        <Image source={require('../../../assets/icons/handleDisplayPassword.png')} style={styles.IconPassword}/>
      </TouchableWithoutFeedback>
    </View>
  );

};

const styles = StyleSheet.create({
  field:{
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  icon:{
    width: 45,
    height: 45,
    zIndex: 2,
    borderRadius: 50,
    backgroundColor: '#ffffff',
  },
  input:{
    width: 260,
    height: 40,
    marginLeft: -30,
    zIndex: 1,
    paddingLeft: 35,
    paddingRight: 50,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    fontSize: 20,
    color: '#305E69',
    display: 'flex',
    alignItems: 'center',
  },
  IconPassword:{
    width: 30,
    height: 30,
    zIndex: 2,
    marginLeft: -37,
    borderRadius: 50,
  },
});