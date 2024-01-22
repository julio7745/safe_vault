
import { useState, useRef, } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Text,} from 'react-native';

export default ({inputRefs, setPasswordValue, passwordValue, passwordErrors}) => {
  
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
    <View>
      <View style={styles.field}>
        <TouchableWithoutFeedback onPress={selectpasswordField}>
          <Image source={require('../../../assets/icons/login/password.png')} style={styles.icon} />
        </TouchableWithoutFeedback>
        <TextInput
          style={styles.input}
          secureTextEntry={displayPassword}
          placeholder="Password"
          autoComplete="off"
          ref={inputRefs.passwordField}
          value={passwordValue}
          onChangeText={(text) => setPasswordValue(text)}
          maxLength={15}
        />
        <TouchableWithoutFeedback onPress={handleDisplayPassword}>
          <Image source={require('../../../assets/icons/login/handleDisplayPassword.png')} style={styles.IconPassword}/>
        </TouchableWithoutFeedback>
      </View>
      {
        passwordErrors.map((error, index) => (
          <View key={`passwordError${index}`} style={styles.err}>
            {error ? <Text style={styles.errTxt}>{error}</Text> : null}
          </View>
        ))
      }
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
  err:{
    marginLeft: 5,
    marginTop: -5, 
    width: 270,
    borderRadius: 10,
    marginBottom: 10,
  },
  errTxt: {
    color: '#ff0000',
    fontSize: 13.5,
    textShadowColor: '#ffffff',
    textShadowRadius: .05,
  },
});