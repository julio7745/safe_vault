
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, } from 'react-native';

import getOpenings from '../services/openings/getOpenings.js'

import ClearOpenings from '../components/openings/ClearOpenings.js'
import Opening from '../components/openings/Opening.js'
import ConfirmDeletion from '../components/openings/ConfirmDeletion.js'

export default ({user, setloading, setCurrentPage, }) => {

  const [openings, setOpenings] = useState([]);
  const [deletion, setDeletion] = useState('');

  useEffect( () => {
    
    getOpenings({setloading, user, setOpenings, setCurrentPage });

  }, []);

  return (
    <View style={styles.containOpening}>
      <FlatList
        data={[...openings, { empty: true }]}
        style={styles.listOpening}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (item.empty) {
            return <View style={styles.paddingItem} />;
          } else {
            return <Opening {...{ opening: item, setDeletion, index }} />;
          }
        }}
      />
      <ClearOpenings {...{user, setCurrentPage, setloading}}/>
      { deletion && <ConfirmDeletion {...{setDeletion, user, setloading, setCurrentPage, deletion }} /> }
    </View>
  );
};

const styles = StyleSheet.create({
  containOpening: {
    height: '82%',
    width: '100%',
    backgroundColor: '#ffffff',
    position: 'relative',
    paddingTop: 5,
    paddingBottom: 5,
    display: 'flex',
    alignItems: 'center'
    },
  listOpening: {
    height: '100%',
    width: '100%',
  },paddingItem: {
    height: 95,
  }
});
