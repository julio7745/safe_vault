
import React, { useState } from 'react';
import { View, Text } from 'react-native';

export default Screen = () => {

  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState({});

  const renderPage = () => {

    if (user.id){
      switch (currentPage) {

        case 'home':
          return (
            <View>
              <Text>
                home
              </Text>
            </View>
          ); 
        default:
          return (
            <View>
              <Text>
                default
              </Text>
            </View> 
          )

      }
    }else{
      return (
        <View>
          <Text>
            Login
          </Text>
        </View> 
      )
    }
  };

  return (
    <View>
      {renderPage()}
    </View>  
  );
};



