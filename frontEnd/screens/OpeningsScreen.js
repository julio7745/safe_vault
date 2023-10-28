
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, } from 'react-native';

import getOpenings from '../services/openings/getOpenings'

import ClearOpenings from '../components/openings/ClearOpenings'
import Opening from '../components/openings/Opening'
import ConfirmDeletion from '../components/openings/ConfirmDeletion'

export default ({user, setloading, setCurrentPage, }) => {

  const [openings, setOpenings] = useState([]);
  const [deletion, setDeletion] = useState('');

  useEffect( () => {
    
    getOpenings({setloading, user, setOpenings, setCurrentPage });

  }, []);

  return (
    <View style={styles.containOpening}>
      <FlatList
        data={[{ empty: true }, ...openings].reverse()}
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
      <ClearOpenings {...{setDeletion, }}/>
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
