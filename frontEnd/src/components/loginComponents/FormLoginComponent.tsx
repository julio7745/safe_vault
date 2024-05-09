
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, TextInput} from 'react-native';
import { styled } from "nativewind";

import styles from '@/assets/styles/componentsStyles/loginComponentsStyles/FormLoginComponentStyles'

import userIco from '@/assets/icons/loginIcos/user.png'
import passwordIco from '@/assets/icons/loginIcos/password.png' 
import handleDisplayPasswordIco from '@/assets/icons/loginIcos/handleDisplayPassword.png'
import loginIco from '@/assets/icons/loginIcos/login.png'

const SView = styled(View)
const SText = styled(Text)
const STextInput = styled(TextInput)
const SImage = styled(Image)

export default () => {

  const [login, setLogin] = useState({user: 'julio.carvalho', password: '123456aA'});
  const [errors, setErrors] = useState({user: [ 'oi'], password: ['LoreAahsgfhggHsjdgidffksgdf JKHAiujagdhsfgf']});

  const [displayPassword, setdisplayPassword] = useState(true);

  return (
    <SView className={styles.loginForm}>
      <SText className={styles.titleForm}>Login</SText>

      <SView className={styles.field}>
        <TouchableWithoutFeedback>
          <SImage source={userIco} className={styles.icon}/>
        </TouchableWithoutFeedback>
        <STextInput
          onChangeText={(Text) => setLogin({ user: Text, password: login.password})}
          placeholder="Name.Lastname"
          className={styles.input}
          value={login.user}
          autoComplete="off"
          maxLength={35}
        />
      </SView>
      {
        <SView>
          {errors.user ? <SText className={styles.errTxt}>{errors.user[0]}</SText> : null}
        </SView>
      }
      
      <SView className={styles.field}>
        <TouchableWithoutFeedback>
          <SImage source={passwordIco} className={styles.icon} />
        </TouchableWithoutFeedback>
        <STextInput
          onChangeText={(Text) => setLogin({ user: login.user, password: Text})}
          secureTextEntry={displayPassword}
          placeholder="Password"
          value={login.password}
          className={styles.input}
          autoComplete="off"
          maxLength={15}
        />
        <TouchableWithoutFeedback onPress={ () => setdisplayPassword(!displayPassword)}>
          <SImage source={handleDisplayPasswordIco} className={styles.IconPassword}/>
        </TouchableWithoutFeedback>
      </SView>
      <SView>
      {
        <SView>
          {errors.password ? <SText className={styles.errTxt}>{errors.password[0]}</SText> : null}
        </SView>
      }
        
      </SView>
      <SView className={styles.campBtnLogin}>
        <TouchableWithoutFeedback 
          onPress={() => console.log("login")}>
          <SImage source={loginIco} className={styles.btnLogin} resizeMode='contain'/>
        </TouchableWithoutFeedback>
      </SView>
    </SView>
  );

};