
import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import OpeningsScreen from './screens/OpeningsScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import HomeScreen from './screens/HomeScreen.js';

import NavBar from './components/common/NavBarComponent';
import LoadingComponent from './components/common/LoadingComponent.js';
import Header from './components/common/HeaderComponent';

import loadUserService from './services/loginServices/loadUserService.js';

export default () => {

  const [currentPage, setCurrentPage] = useState('login');
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    _id: '',
  });
  
  useEffect(() => { loadUserService({...{
    setCurrentPage,
    setloading,
    setUser,
  }})}, []);

  switch (currentPage) {
    
    case 'login': return (
      <View style={styles.appContainer}>
        <LoginScreen {...{
          setCurrentPage,
          setloading,
          setUser
        }}/>
        <LoadingComponent {...{ loading }}/>
      </View>
    )

    case 'home': return (
      <View style={styles.container}>
        <Header {...{
          currentPage
        }}/>
        <HomeScreen {...{
          currentPage, setCurrentPage,
          setloading,
          user, setUser
        }}/>
        <NavBar {...{
          currentPage, setCurrentPage
        }}/>
        <LoadingComponent {...{ loading }}/>
      </View>
    )

    case 'openings': return (
      <View style={styles.container}>
        <Header {...{
          currentPage
        }}/>
        <OpeningsScreen {...{
          setCurrentPage,
          setloading,
          user
        }}/>
        <NavBar {...{
          currentPage, setCurrentPage
        }}/>
        <LoadingComponent {...{ loading }}/>
      </View>
    )

    default: return (
      <View style={styles.container}>
        <Header {...{
          currentPage
        }}/>
        <HomeScreen {...{
          currentPage, setCurrentPage,
          loading, setloading,
          user, setUser
        }}/>
        <NavBar {...{
          currentPage, setCurrentPage
        }}/>
        <LoadingComponent {...{ loading }}/>
      </View>
    )

  }

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
