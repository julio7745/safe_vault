
import React, { useContext, } from 'react';
import { KeyboardAvoidingView, ScrollView} from 'react-native';
import { styled } from "nativewind";

import { CurrentPageProvider, CurrentPageContext } from '@/contexts/CurrentPageContext';

import LoginScreen from '@/screens/LoginScreen'; 
import HomeScreen from '@/screens/HomeScreen'; 
import OpeningsScreen from '@/screens/OpenigScreen'
import ProfileScreen from '@/screens/ProfileScreen';
import OptionsScreen from '@/screens/OptionsScreen';

import LoadingComponent from '@/components/commonComponents/LoadingComponent';

import styles from '@/assets/styles/ScreenStyles';

const SView = styled(KeyboardAvoidingView)
const SScrollView = styled(ScrollView)

export default () => {  
  
  const RenderScreen = () => {

    const { currentPage } = useContext(CurrentPageContext);
    switch (currentPage) {
      case 'login':
        return (
          <SView behavior="padding" enabled className={styles.screen + " bg-darkBlue"} keyboardVerticalOffset={0}>
            <LoginScreen />
            <LoadingComponent />
          </SView>
        )
      case 'home':
        return (
          <SView behavior="padding" enabled className={styles.screen} keyboardVerticalOffset={0}>
            <HomeScreen />
            <LoadingComponent />
          </SView>
        )
      case 'openings':
        return (
          <SView behavior="padding" enabled className={styles.screen} keyboardVerticalOffset={0}>
            <OpeningsScreen />
            <LoadingComponent />
          </SView>
        )
      case 'profile':
        return (
          <SView behavior="padding" enabled className={styles.screen} keyboardVerticalOffset={0}>
            <ProfileScreen />
            <LoadingComponent />
          </SView>
        )
      case 'options':
        return (
          <SView behavior="padding" enabled className={styles.screen} keyboardVerticalOffset={0}>
            <OptionsScreen />
            <LoadingComponent />
          </SView>
        )
      default:
        return (
          <SView behavior="padding" enabled className={styles.screen} keyboardVerticalOffset={0}>
            <HomeScreen />
            <LoadingComponent />
          </SView>
        )
    }
  }

  return (
    <CurrentPageProvider>
      <RenderScreen />
    </CurrentPageProvider>
  );
}
