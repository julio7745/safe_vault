
import { View, StyleSheet, Text, } from 'react-native';

export default Header = ({currentPage, }) => {

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}> {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} </Text>
    </View>  
  );

};

const styles = StyleSheet.create({
  header: {
    height: '8%',
    width: '100%',
    backgroundColor: '#1b353b',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingLeft: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 10,
  }
});
