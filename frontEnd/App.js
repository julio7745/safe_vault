
import { useState, useEffect } from 'react';

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

  const props = {
    currentPage, setCurrentPage,
    loading, setloading,
    user, setUser
  };
  
  useEffect(() => { loadUserService({...{props}})}, []);

  switch (currentPage) {
    case 'login': return <LoginScreen {...{props}} />
    case 'home': return <HomeScreen {...{props}} />
    default: return <LoginScreen {...{props}} />
  }

};

