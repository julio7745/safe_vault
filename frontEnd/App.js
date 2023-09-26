
import { useState, useEffect } from 'react';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

import StorageUser from './services/login/StorageUser.js';

const App = () => {

  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState({});

  useEffect(() => {
    
    StorageUser.load({setCurrentPage, setUser, });

  }, []);

  switch (currentPage) {
    case 'login':
      return <LoginScreen {...{setCurrentPage, setUser, }}/>;
    case 'home':
      return <HomeScreen {...{setCurrentPage, user, }}/>;
    default:
      return <LoginScreen {...{setCurrentPage, setUser, }}/>;
  }
  
};

export default App;
