import React, { useState, createContext, useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet} from 'react-native';

import LoginScreen from '@/screens/LoginScreen'; 
import HomeScreen from '@/screens/HomeScreen'; 

import styles from '@/assets/styles/ScreenStyles';

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
      <KeyboardAvoidingView behavior="padding" enabled style={styles.screen}>
        <RenderScreen />
      </KeyboardAvoidingView>
    </CurrentPageContext.Provider>
  );
}
