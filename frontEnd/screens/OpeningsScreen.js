
import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, } from 'react-native';

import getOpenings from '../services/openings/getOpenings.js'

export default HomeScreen = ({user}) => {

  const [openings, setOpenings] = useState([]);

  useEffect( () => {
    
    getOpenings({setOpenings, user});

  }, []);

  return (
    <View style={styles.container}>
      <Text>PAGINA ATUAL: openings</Text>
    </View>  
  );
};

const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
});
