
import React from 'react';
import { View } from 'react-native';

import HomeView1 from '@/views/homeViews/HomeView1'
import HomeView2 from '@/views/homeViews/HomeView2'

export default () => {
  return (
    <View>
      <HomeView1 />
      <HomeView2 />
    </View>
  );
}
