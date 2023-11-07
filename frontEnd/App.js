
import { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import OpeningsScreen from './screens/OpeningsScreen';
import ProfileScreen from './screens/ProfileScreen';

import NavBar from './components/common/NavBar';
import Header from './components/common/Header';

import loadUser from './services/login/loadUser';

const App = () => {

  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    
    loadUser({setCurrentPage, setUser, setloading});

  }, []);

  StatusBar.setBarStyle('light-content');
  StatusBar.setBackgroundColor('#1b353b');

  switch (currentPage) {

    case 'login':
      return (
        <View>
          <LoginScreen {...{setCurrentPage, setUser, setloading, }}/>
          { loading && <LoadingScreen/> }
        </View>
      );

    case 'home':
      return (
        <View style={styles.container}>
          <Header {...{currentPage, }}/>
          <HomeScreen {...{user, setCurrentPage, setloading, currentPage }}/>
          <NavBar  {...{setCurrentPage, currentPage, }}/>
          { loading && <LoadingScreen/> }
        </View>
      );

    case 'openings':
    return (
      <View style={styles.container}>
        <Header {...{currentPage}}/>
        <OpeningsScreen {...{user, setloading, setCurrentPage, }}/>
        <NavBar  {...{setCurrentPage, currentPage, setloading}}/>
        { loading && <LoadingScreen/> }
      </View>
    );

    case 'profile':
    return (
      <View style={styles.container}>
        <Header {...{currentPage}}/>
        <ProfileScreen {...{user, setCurrentPage, setloading, }}/>
        <NavBar  {...{setCurrentPage, currentPage, }}/>
        { loading && <LoadingScreen/> }
      </View>
    );

    default:
      return (
        <View style={styles.container}>
          <Header {...{currentPage}}/>
          <HomeScreen {...{user, setCurrentPage, setloading, currentPage }}/>
          <NavBar  {...{setCurrentPage, currentPage}}/>
          {loading && <LoadingScreen />}
        </View>
      );
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

export default App;
