
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, } from 'react-native';

import getOpenings from '../services/openings/getOpenings'
import getUsers from '../services/common/getUsers'

import ClearOpenings from '../components/openings/ClearOpenings'
import Opening from '../components/openings/Opening'
import ConfirmDeletion from '../components/openings/ConfirmDeletion'

export default ({user, setloading, setCurrentPage, }) => {

  const [openings, setOpenings] = useState([]);
  const [deletion, setDeletion] = useState('');
  const [users, setUsers] = useState(null);

  useEffect( () => {
    
    getUsers({setloading, user, setUsers, setCurrentPage })
    getOpenings({setloading, user, setOpenings, setCurrentPage });

  }, []);

  return (
    <View style={styles.containOpening}>
      {
        users && ( 
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
                return <Opening {...{ opening: item, users, setloading, setDeletion, index, }} />;
              }
            }}
          />
        )
      }
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
    display: 'flex',
    alignItems: 'center'
    },
  listOpening: {
    height: '100%',
    width: '100%',
    backgroundColor: '#4687975b',
    paddingTop: 5,
    paddingBottom: 5,
  },paddingItem: {
    height: 105,
  }
});
