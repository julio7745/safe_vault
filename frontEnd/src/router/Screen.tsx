
import { useState } from 'react';
import { View } from 'react-native';

import LoginScreen from '@/screens/LoginScreen' 
import HomeScreen from '@/screens/HomeScreen' 

export default function App() {

  const [currentPage, setCurrentPage] = useState('home');
  
  const renderScreen = () => {

    switch (currentPage) {
      case 'login':
        return <LoginScreen/>;
      case 'home':
        return <HomeScreen/>;
      default:
        return <LoginScreen/>;
    }

  };

  return (
    <View>
       {renderScreen()}
    </View>
  );
}
