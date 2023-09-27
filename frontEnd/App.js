
import { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

import NavBar from './components/common/navBar'

import loadUser from './services/login/loadUser';

const App = () => {

  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState({});

  useEffect(() => {
    
    loadUser({setCurrentPage, setUser, });

  }, []);

  StatusBar.setBarStyle('light-content');
  StatusBar.setBackgroundColor('#1b353b');

  switch (currentPage) {
    case 'login':
      return <LoginScreen {...{setCurrentPage, setUser, }}/>;
    case 'home':
      return (
        <View style={styles.container}>
          <HomeScreen {...{user, setCurrentPage, currentPage}}/>
          <NavBar  {...{setCurrentPage, currentPage}}/>
        </View>
      );
    default:
      return (
        <View style={styles.container}>
          <HomeScreen {...{user, setCurrentPage, currentPage}}/>
          <NavBar  {...{setCurrentPage, currentPage}}/>
        </View>
      );;
  }
  
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b353b',
    overflow: 'hidden',
    paddingTop: 30,
  }
});

export default App;
