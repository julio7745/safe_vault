
import { View, StyleSheet, Text, } from 'react-native';

export default HomeScreen = ({ setCurrentPage, user, currentPage }) => {

  return (
    <View style={styles.content}>
      <Text>{user.name}</Text>
      <Text>{user.lastName}</Text>
      <Text>{user.id}</Text>
      <Text>{currentPage}</Text>
    </View>  
  );
};

const styles = StyleSheet.create({
  content: {
    height: '90%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
});
