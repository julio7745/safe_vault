import React, { useState } from 'react';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {

  const [currentPage, setcurrentPage] = useState('login');
  const [user, setUser] = useState(0);

  switch (currentPage) {
    case 'login':
      return <LoginScreen setcurrentPage={setcurrentPage} setUSer={setUser}/>;
    case 'home':
      return <HomeScreen setcurrentPage={setcurrentPage}/>;
    default:
      return <LoginScreen setcurrentPage={setcurrentPage}/>;
  }
  
};

export default App;
