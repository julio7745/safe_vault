
import React from 'react';
import { View } from 'react-native';

import HomeView1 from '@/views/homeViews/HomeView1'
import HomeView2 from '@/views/homeViews/HomeView2'

import HeaderComponent from '@/components/commonComponents/HeaderComponent';
import NavBarComponent from '@/components/commonComponents/NavBarComponent';

const RenderView = () =>  <HomeView1 />

export default () => {
  return (
    <>
      <HeaderComponent />
      <RenderView />
      <NavBarComponent />
    </>
  );
}
