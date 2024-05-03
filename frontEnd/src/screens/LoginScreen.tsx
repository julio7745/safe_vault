
import React from 'react';
import { View } from 'react-native';

import styles from '@/assets/styles/screens/LoginScreen'

import LoginView from '@/views/loginViews/LoginView'
import LoginView2 from '@/views/loginViews/LoginView2'

export default () => {

  const RenderView = () =>  <LoginView />

  return (
    <View style={styles.LoginScreen} >
      <RenderView />
    </View>
  );
}

