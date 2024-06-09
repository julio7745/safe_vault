
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, TextInput} from 'react-native';
import { styled } from "nativewind";

import { CurrentPageContext } from '@/contexts/CurrentPageContext';
import { LoadingContext } from '@/contexts/LoadingContext';

import AutoLogin from '@/services/loginServices/AutoLoginService';

import styles from '@/assets/styles/componentsStyles/loginComponentsStyles/FormLoginComponentStyles'

import userIco from '@/assets/icons/loginIcos/user.png'
import passwordIco from '@/assets/icons/loginIcos/password.png' 
import handleDisplayPasswordIco from '@/assets/icons/loginIcos/handleDisplayPassword.png'
import loginIco from '@/assets/icons/loginIcos/login.png'

import LoginService from '@/services/loginServices/LoginService';

const SView = styled(View)
const SText = styled(Text)
const STextInput = styled(TextInput)
const SImage = styled(Image)

export default () => {

  const [login, setLogin] = useState({user: 'julio.carvalho', password: '123456aA'});
  const [errors, setErrors] = useState({user: [], password: []});

  const [displayPassword, setdisplayPassword] = useState(true);

  const { setCurrentPage } = useContext(CurrentPageContext);
  const { setLoading } = useContext(LoadingContext);

  const propsLoginService = {
    setCurrentPage,
    setLoading,
    setErrors,
    login
  }

  const propsAutoLogin = {
    setCurrentPage,
    setLoading,
  }

  useEffect(() => {
    AutoLogin(propsAutoLogin);
  }, []);

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
          onPress={() => LoginService(propsLoginService)}>
          <SImage source={loginIco} className={styles.btnLogin} resizeMode='contain'/>
        </TouchableWithoutFeedback>
      </SView>
    </SView>
  );

};