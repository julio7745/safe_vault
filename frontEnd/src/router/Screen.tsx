
import React, { useState, createContext, useContext } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { styled } from "nativewind";

import { CurrentPageProvider, CurrentPageContext } from '@/contexts/CurrentPageContext';

import LoginScreen from '@/screens/LoginScreen'; 
import HomeScreen from '@/screens/HomeScreen'; 
import OpeningsScreen from '@/screens/OpenigScreen'
import ProfileScreen from '@/screens/ProfileScreen';
import OptionsScreen from '@/screens/OptionsScreen';

import LoadingComponent from '@/components/commonComponents/LoadingComponent';

import styles from '@/assets/styles/ScreenStyles';

const RenderScreen = () => {
  const { currentPage } = useContext(CurrentPageContext);
  switch (currentPage) {
    case 'login':
      return <LoginScreen />;
    case 'home':
      return <HomeScreen />;
    case 'openings':
      return <OpeningsScreen />;
    case 'profile':
      return <ProfileScreen />;
    case 'options':
        return <OptionsScreen />;
    default:
      return <HomeScreen />;
  }
}

const SView = styled(KeyboardAvoidingView)

export default () => {
  return (
    <CurrentPageProvider>
      <SView behavior="padding" enabled className={styles.screen}>
        <RenderScreen />
        <LoadingComponent />
      </SView>
    </CurrentPageProvider>
  );
}
