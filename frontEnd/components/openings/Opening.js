
import { View, StyleSheet, Text, } from 'react-native';

import DeleteOpening from './DeleteOpening.js'

export default ({opening, setDeletion, }) => {

  return (
    <View style={styles.opening}>
        <View style={styles.openingTextContainer}>
          <Text>
            <Text style={styles.strong}>User: </Text>
            {opening.name.charAt(0).toUpperCase() + opening.name.slice(1)}.
            {opening.lastname.charAt(0).toUpperCase() + opening.lastname.slice(1)}
          </Text>
          <Text>
            <Text style={styles.strong}>Date: </Text>
            {opening.month.charAt(0).toUpperCase() + opening.month.slice(1)} {opening.day}
            , {opening.year} at {opening.hour}:{opening.minute}</Text>
        </View>
        <DeleteOpening {...{ opening, setDeletion, }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  opening: {
    height: 75,
    width: '95%',
    margin: 2,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: '#1b353b',
    borderWidth: 1,
    backgroundColor: '#305e695b',
  },
  strong:{
    fontWeight: 'bold',
  }
});
