
import { useState, useEffect } from 'react';
import { View, StyleSheet, } from 'react-native';

import getOpenings from '../services/openings/getOpenings.js'

import ClearOpenings from '../components/openings/clearButton.js'
import Opening from '../components/openings/Opening.js'

export default ({user, setloading, setCurrentPage, }) => {

  const [openings, setOpenings] = useState([]);

  useEffect( () => {
    
    getOpenings({setloading, user, setOpenings, setCurrentPage });

  }, []);

  return (
    <View style={styles.containOpening}>
      {
        openings.map((opening, index) => (
         <Opening key={index} {...{opening, index}}/>
        ))
      }
      <ClearOpenings {...{user, setCurrentPage, setloading}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  containOpening: {
    height: '82%',
    width: '100%',
    display: "flex",
    backgroundColor: '#ffffff',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
});
