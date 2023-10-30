
import { View, StyleSheet, Text, Image, } from 'react-native';

export default ({currentPage, }) => {

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}> {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} </Text>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/imgs/logoClara3.png')} style={styles.logo}/>
      </View>
    </View>  
  );

};

const styles = StyleSheet.create({
  header: {
    height: '8%',
    width: '100%',
    backgroundColor: '#1b353b',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    alignItems: 'center',
    paddingLeft: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  logoContainer:{
    width: 58,
    height: 58,
    borderColor: '#ffffff',
    borderRadius: 100,
    borderWidth: 2.5,
    marginRight: 30,
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 45,
    height: 55,
    marginTop: 2,
    marginRight: 2, 
  }
});
