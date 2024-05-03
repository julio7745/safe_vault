
import React, { useState, createContext, useContext } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { styled } from "nativewind";

import LoginScreen from '@/screens/LoginScreen'; 
import HomeScreen from '@/screens/HomeScreen'; 

import styles from '@/assets/styles/ScreenStyles';

const SView = styled(KeyboardAvoidingView)

export default () => {

  const [currentPage, setCurrentPage] = useState('login');
  const CurrentPageContext = createContext([currentPage, setCurrentPage]);

  const RenderScreen = () => {
    const [currentPage] = useContext(CurrentPageContext);
  
    switch (currentPage) {
      case 'login':
        return <LoginScreen />;
      case 'home':
        return <HomeScreen />;
      default:
        return <LoginScreen />;
    }
    
  }
  
  return (
    <CurrentPageContext.Provider value={[currentPage, setCurrentPage]}>
      <SView behavior="padding" enabled className={styles.screen}>
        <RenderScreen />
      </SView>
    </CurrentPageContext.Provider>
  );
}
