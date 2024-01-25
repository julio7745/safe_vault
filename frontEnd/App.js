import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import NavBarComponent from './components/common/NavBarComponent';
import LoadingComponent from './components/common/LoadingComponent';
import HeaderComponent from './components/common/HeaderComponent';

import loadUserService from './services/loginServices/loadUserService';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import OpeningsScreen from './screens/OpeningsScreen';

export default () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: '', lastName: '', _id: '' });

  useEffect(() => {
    loadUserService({
      setCurrentPage,
      setLoading,
      setUser,
    });
  }, []);

  const renderScreen = () => {

    switch (currentPage) {
      case 'login':
        return <LoginScreen {...{ setCurrentPage, setLoading, setUser }} />;
      case 'home':
        return <HomeScreen {...{ currentPage, setCurrentPage, setLoading, user, setUser }} />;
      case 'openings':
        return <OpeningsScreen {...{ setCurrentPage, setLoading, user }} />;
      default:
        return <HomeScreen {...{ currentPage, setCurrentPage, setLoading, user, setUser }} />;
    }
  };

  const HeaderComponentVisible = () => currentPage === 'login' ? null : <HeaderComponent {...{ currentPage }} />
  const NavBarComponentVisible = () => currentPage === 'login' ? null : <NavBarComponent {...{ currentPage, setCurrentPage }} />


  return (
      <View style={styles.container}>
        {HeaderComponentVisible()}
        {renderScreen()}
        {NavBarComponentVisible()}
        <LoadingComponent {...{ loading }} />
      </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    height: '100%',
    width: '100%',
    display: "flex",
    backgroundColor: '#1b353b',
    paddingTop: 35,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b353b',
    overflow: 'hidden',
    paddingTop: 35,
  }
});
