
import { View, StyleSheet, Text, Image } from 'react-native';

import DeleteOpening from './DeleteOpening.js'

export default ({opening, setDeletion, }) => {

  return (
    <View style={styles.opening}>
        {/*<Image source={require('../../assets/imgs/logoClara1.png')} style={styles.user}/>*/}
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
            :{opening.minute} {opening.hour > 12 ? 'PM' : 'AM'}</Text>
        </View>
        <DeleteOpening {...{ opening, setDeletion, }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  opening: {
    height: 75,
    //height: 90,
    width: '95%',
    margin: 2,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //justifyContent: 'space-around',
    borderColor: '#1b353b',
    borderWidth: 1,
    backgroundColor: '#305e695b',
  },
  /*user:{
    height: 75,
    width: 65,
    backgroundColor: '#1b353b'
  },*/
  strong:{
    fontWeight: 'bold',
  }
});
