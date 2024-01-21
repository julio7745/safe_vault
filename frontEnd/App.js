
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import OpeningsScreen from './screens/OpeningsScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import HomeScreen from './screens/HomeScreen.js';

import NavBar from './components/common/NavBarComponent';

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
    
    case 'login': return <LoginScreen {...{
      setCurrentPage,
      loading, setloading,
      setUser
    }}/>

    case 'home': return <HomeScreen {...{
      currentPage, setCurrentPage,
      loading, setloading,
      user, setUser
    }}/>

    default: return (
      <View style={styles.container}>
        <Text>{`Error 404: ${currentPage}`}</Text>
        <NavBar {...{
          currentPage, setCurrentPage
        }}/>
      </View>
    )

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
    paddingTop: 35,
  }
});

