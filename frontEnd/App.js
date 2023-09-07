
import { useState } from 'react';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {

  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState({});

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
