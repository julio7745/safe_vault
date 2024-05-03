
import React from 'react';
import { View } from 'react-native';
import { styled } from "nativewind";

import styles from '@/assets/styles/screensStyles/LoginScreenStyles'

import LoginView from '@/views/loginViews/LoginView'

const SView = styled(View)

export default () => {

  const RenderView = () =>  <LoginView />

  return (
    <SView className={styles.LoginScreen} >
      <RenderView />
    </SView>
  );
}
