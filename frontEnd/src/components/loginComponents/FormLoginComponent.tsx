
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, TextInput} from 'react-native';
import { styled } from "nativewind";

import styles from '@/assets/styles/componentsStyles/loginComponentsStyles/FormLoginComponentStyles'

import userIco from '@/assets/icons/loginIcos/user.png'
import passwordIco from '@/assets/icons/loginIcos/password.png' 
import handleDisplayPasswordIco from '@/assets/icons/loginIcos/handleDisplayPassword.png'
import loginIco from '@/assets/icons/loginIcos/login.png'

import LoginHook from '@/hooks/commonHooks/LoginHook';

const SView = styled(View)
const SText = styled(Text)
const STextInput = styled(TextInput)
const SImage = styled(Image)

export default () => {

  const [login, setLogin] = useState<{user: string, password: string}>({user: 'julio.carvalho', password: 'Aa123456'});
  const [errors, setErrors] = useState<{user: string[], password: string[]}>({user: [], password: []});

  const [displayPassword, setdisplayPassword] = useState<boolean>(true);

  const propsLoginService = {
    setErrors,
    login
  }

  useEffect(() => {
    LoginServices.autoLogin();
  }, []);

  const LoginServices = LoginHook()

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
      {errors.user.length > 0 ? <SText className={styles.errTxt}>{errors.user[0]}</SText> : <></>}
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
      {errors.password.length > 0 ? <SText className={styles.errTxt}>{errors.password[0]}</SText> : <></>}
      <SView className={styles.campBtnLogin}>
        <TouchableWithoutFeedback 
          onPress={async () => await LoginServices.login(propsLoginService)}>
          <SImage source={loginIco} className={styles.btnLogin} resizeMode='contain'/>
        </TouchableWithoutFeedback>
      </SView>
    </SView>
  );

};