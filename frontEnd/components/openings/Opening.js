
import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import DeleteOpening from './DeleteOpening'
import ProfileImage from './ProfileImage.js' 

export default ({opening, setDeletion, users, }) => {

  const [userOfOpening] = useState(users.find(userItem => userItem._id === opening.userId));

  return (
    <View style={styles.opening}>
        <ProfileImage {...{ _id: userOfOpening._id, }}/>
        <View style={styles.openingTextContainer}>            
          <Text>
            <Text style={styles.strong}>User: </Text>
            {userOfOpening.name.charAt(0).toUpperCase() + userOfOpening.name.slice(1)}.
            {userOfOpening.lastName.charAt(0).toUpperCase() + userOfOpening.lastName.slice(1)}
          </Text>
          <Text>
            <Text style={styles.strong}>Date: </Text>
            {opening.month.charAt(0).toUpperCase() + opening.month.slice(1)} {opening.day}
            , {opening.year} at {opening.hour > 12 ? opening.hour-12 : opening.hour}
            :{opening.minute > 9 ? opening.minute : `0${opening.minute}` } {opening.hour > 12 ? 'PM' : 'AM'}</Text>
        </View>
        <DeleteOpening {...{ opening, setDeletion }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  opening: {
    height: 90,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#ffffff',
    borderBottomWidth: 1,
  },
  openingTextContainer:{
    margin: 10,
    marginRight: 20,
  },
  strong:{
    fontWeight: 'bold',
  }
});
