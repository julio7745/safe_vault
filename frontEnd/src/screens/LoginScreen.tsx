
import React from 'react';
import { View } from 'react-native';

import LoginView1 from '@/views/loginViews/LoginView1'
import LoginView2 from '@/views/loginViews/LoginView2'

export default function Screen() {
  return (
    <View>
      <LoginView1 />
      <LoginView2 />
    </View>
  );
}
