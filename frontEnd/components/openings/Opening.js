
import { View, StyleSheet, Text, Image } from 'react-native';

import DeleteOpening from './DeleteOpening'

export default ({opening, setDeletion, }) => {

  return (
    <View style={styles.opening}>
        <View style={styles.openingTextContainer}>
          <Text>
            <Text style={styles.strong}>User: </Text>
            {opening.name.charAt(0).toUpperCase() + opening.name.slice(1)}.
            {opening.lastName.charAt(0).toUpperCase() + opening.lastName.slice(1)}
          </Text>
          <Text>
            <Text style={styles.strong}>Date: </Text>
            {opening.month.charAt(0).toUpperCase() + opening.month.slice(1)} {opening.day}
            , {opening.year} at {opening.hour > 12 ? opening.hour-12 : opening.hour}
            :{opening.minute > 9 ? opening.minute : `0${opening.minute}` } {opening.hour > 12 ? 'PM' : 'AM'}</Text>
        </View>
        <DeleteOpening {...{ opening, setDeletion, }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  opening: {
    height: 80,
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: '#1b353b',
    borderBottomWidth: 1,
  },
  strong:{
    fontWeight: 'bold',
  }
});
