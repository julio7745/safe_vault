
import React from 'react';
import { View } from 'react-native';
import { styled } from "nativewind";

import LoginView from '@/views/loginViews/LoginView'

import styles from '@/assets/styles/screensStyles/LoginScreenStyles'

const RenderView = () =>  <LoginView />

const SView = styled(View)

export default () => {
  return (
    <SView className={styles.LoginScreen} >
      <RenderView />
    </SView>
  );
}
