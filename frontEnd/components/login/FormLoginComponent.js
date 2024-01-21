
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, TextInput } from 'react-native';
import { useState } from 'react';

import loginService from '../../services/loginServices/loginService.js';

export default ({
    setCurrentPage,
    setloading,
    setUser
  }) => {

  const [login, setLogin] = useState({user: 'julio.carvalho', password: '123456aA'});
  const [errors, setErrors] = useState({user: [], password: []});

  exports.propsOfLoginForm = {
    login, setLogin,
    errors, setErrors
  };

  const [displayPassword, setdisplayPassword] = useState(true);

  return (
    <View style={styles.loginForm}>
      <Text style={styles.titleForm}>Login</Text>
      {
        errors.user.map((error, index) => (
          <View key={`userError${index}`} style={styles.err}>
            {error ? <Text style={styles.errTxt}>{error}</Text> : null}
          </View>
        ))
      }
      <View style={styles.field}>
        <TouchableWithoutFeedback>
          <Image source={require('../../assets/icons/login/user.png')} style={styles.icon}/>
        </TouchableWithoutFeedback>
        <TextInput
          onChangeText={(text) => setLogin({ user: text, password: login.password})}
          placeholder="Name.Lastname"
          style={styles.input}
          value={login.user}
          autoComplete="off"
          maxLength={35}
        />
      </View>
      {
        errors.password.map((error, index) => (
          <View key={`passwordError${index}`} style={styles.err}>
            {error ? <Text style={styles.errTxt}>{error}</Text> : null}
          </View>
        ))
      }
      <View style={styles.field}>
        <TouchableWithoutFeedback>
          <Image source={require('../../assets/icons/login/password.png')} style={styles.icon} />
        </TouchableWithoutFeedback>
        <TextInput
          onChangeText={(text) => setLogin({ user: login.user, password: text})}
          secureTextEntry={displayPassword}
          placeholder="Password"
          value={login.password}
          style={styles.input}
          autoComplete="off"
          maxLength={15}
        />
        <TouchableWithoutFeedback onPress={ () => setdisplayPassword(!displayPassword)}>
          <Image source={require('../../assets/icons/login/handleDisplayPassword.png')} style={styles.IconPassword}/>
        </TouchableWithoutFeedback>
      </View>
      <View>
        
      </View>
      <View style={styles.campBtnLogin}>
        <TouchableWithoutFeedback 
          onPress={() => loginService({...{
            setCurrentPage,
            setloading,
            setUser,
            login,
            errors, setErrors
          }})}>
          <Image source={require('../../assets/icons/login/login.png')} style={styles.btnLogin}/>
        </TouchableWithoutFeedback>
      </View>
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
    paddingRight: 15,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    fontSize: 20,
    color: '#305E69',
    display: 'flex',
    alignItems: 'center',
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
  IconPassword:{
    width: 30,
    height: 30,
    zIndex: 2,
    marginLeft: -37,
    borderRadius: 50,
  },
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