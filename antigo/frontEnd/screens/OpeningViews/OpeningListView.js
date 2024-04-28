
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, } from 'react-native';

import getOpenings from '../../services/openingsServices/getOpeningsService'
import getUsers from '../../services/commonServices/getUsersService'
import getImageProfileService from '../../services/commonServices/getImageProfileService';

import OpeningComponent from '../../components/openings/OpeningComponent'
import ClearOpeningsComponent from '../../components/openings/ClearOpeningsComponent';
import ConfirmDeletionComponent from '../../components/openings/ConfirmDeletionComponent';

export default ({
  setCurrentPage,
  setLoading,
  user
  }) => {

  const [openings, setOpenings] = useState([]);
  const [deletion, setDeletion] = useState('');
  const [users, setUsers] = useState([]);

  const [imagesLoading, setImagesLoading ] = useState([])
  
  const loadImages = async () => {
    setLoading(true)
    for (const imageData of imagesLoading) {
      imageData.setImage(await getImageProfileService({ _id: imageData._id, user }));
    }
    setImagesLoading([]);
    setLoading(false);
  };
  
  useEffect( () => {
    
    getUsers({...{
      setCurrentPage,
      setLoading,
      user,
      setUsers 
    }})

    getOpenings({...{
      setLoading,
      user,
      setOpenings 
    }})

  }, []);

  return (
    <View style={styles.containOpening}>

    { users.length > 0 && ( 
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
            return <OpeningComponent {...{ opening: item, users, setDeletion, setImagesLoading}} />;
          }
        }}
        onLayout={() => {
          loadImages()
        }}
      />
    )}
    
    <ClearOpeningsComponent {...{ setDeletion }}/>
    { deletion && <ConfirmDeletionComponent {...{ setDeletion, user, setLoading, setCurrentPage, deletion }} /> }

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
