
import { View, StyleSheet, Text, } from 'react-native';

import ClearOpening from './ClearOpening.js'

export default ({opening, index}) => {

  return (
    <View style={styles.opening} key={index}>
        <Text>User: {opening.name}.{opening.lastname}</Text>
        <Text>Date: {opening.month} {opening.day}, {opening.year} at {opening.hour}:{opening.minute}</Text>
        <ClearOpening/>
    </View>
  );
};

const styles = StyleSheet.create({
  opening: {
    height: 50,
    width: '95%',
    borderColor: "#ffffff",
    borderWidth: 1,
    margin: 2,
    backgroundColor: 'red',
  },
});
