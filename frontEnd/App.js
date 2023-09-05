
import { useState } from 'react';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {

  const [currentPage, setcurrentPage] = useState('login');
  const [id, setId] = useState(0);

  switch (currentPage) {
    case 'login':
      return <LoginScreen {...{setcurrentPage, setId}}/>;
    case 'home':
      return <HomeScreen {...{setcurrentPage, }}/>;
    default:
      return <LoginScreen {...{setcurrentPage, setId}}/>;
  }
  
};

export default App;
