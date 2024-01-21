
import { useState, useEffect } from 'react';
import {Text} from 'react-native';

import OpeningsScreen from './screens/OpeningsScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import HomeScreen from './screens/HomeScreen.js';

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

    default: return <Text>oioi</Text>
  }

};

