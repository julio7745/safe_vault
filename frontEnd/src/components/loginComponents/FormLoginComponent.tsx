
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, TextInput, StyleSheet} from 'react-native';

export default () => {

  const [login, setLogin] = useState({user: 'julio.carvalho', password: '123456aA'});
  const [errors, setErrors] = useState({user: [ 'oi'], password: ['oi']});

  const [displayPassword, setdisplayPassword] = useState(true);

  const userIco = require('@/assets/icons/loginIcos/user.png')
  const passwordIco = require('@/assets/icons/loginIcos/password.png') 
  const handleDisplayPasswordIco = require('@/assets/icons/loginIcos/handleDisplayPassword.png')
  const loginIco = require('@/assets/icons/loginIcos/login.png')

  return (
    <View style={styles.loginForm}>
      <Text style={styles.titleForm}>Login</Text>
      {
        <View style={styles.err}>
          {errors.user ? <Text style={styles.errTxt}>{errors.user[0]}</Text> : null}
        </View>
      }
      <View style={styles.field}>
        <TouchableWithoutFeedback>
          <Image source={userIco} style={styles.icon}/>
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
        <View style={styles.err}>
          {errors.password ? <Text style={styles.errTxt}>{errors.password[0]}</Text> : null}
        </View>
      }
      <View style={styles.field}>
        <TouchableWithoutFeedback>
          <Image source={passwordIco} style={styles.icon} />
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
          <Image source={handleDisplayPasswordIco} style={styles.IconPassword}/>
        </TouchableWithoutFeedback>
      </View>
      <View>
        
      </View>
      <View style={styles.campBtnLogin}>
        <TouchableWithoutFeedback 
          onPress={() => console.log("login")}>
          <Image source={loginIco} style={styles.btnLogin}/>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );

};

import color from '@/assets/configs/colorsConfig'
const styles = StyleSheet.create({
  loginForm:{
    padding: 25,
    borderRadius: 10,
    backgroundColor: color[3],
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
    color: color[2],
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