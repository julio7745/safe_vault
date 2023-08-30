import React, { useState } from 'react';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {

  const [currentPage, setcurrentPage] = useState('login');

  switch (currentPage) {
    case 'login':
      return <LoginScreen handleScreen={{setcurrentPage}}/>;
    case 'home':
      return <HomeScreen handleScreen={{setcurrentPage}}/>;
    default:
      return <LoginScreen handleScreen={{setcurrentPage}}/>;
  }
};

export default App;
