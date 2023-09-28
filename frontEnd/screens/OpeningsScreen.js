
import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, } from 'react-native';

import getOpenings from '../services/openings/getOpenings.js'

import ClearOpenings from '../components/openings/clearButton.js'

export default ({user, setloading, setCurrentPage, }) => {

  const [openings, setOpenings] = useState([]);

  useEffect( () => {
    
    getOpenings({setloading, user, setOpenings, });

  }, []);

  return (
    <View style={styles.container}>
      {
        openings.map((opening, index) => (
          <View style={styles.opening} key={index}>
            <Text>User: {opening.name}.{opening.lastname}</Text>
            <Text>Date: {opening.month} {opening.day}, {opening.year} at {opening.hour}:{opening.minute}</Text>
          </View>
        ))
      }
      <ClearOpenings {...{user, setCurrentPage, setloading}}/>
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
    position: 'relative',
  },
  opening: {
    height: 50,
    width: '90',
    borderColor: "#ffffff",
    borderWidth: 1,
    margin: 2,
    backgroundColor: 'red',
  },
});
