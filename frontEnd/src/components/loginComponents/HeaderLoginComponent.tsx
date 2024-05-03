
import { View, Text, StyleSheet, Image } from 'react-native';

export default () => {

  const logo = require('@/assets/imgs/logoClara1.png')

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>      
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={styles.title}>Safe Vault</Text>
      <Text style={styles.text}>Welcome back!</Text>
    </View>
  );
  
};

const styles = StyleSheet.create({
  header:{
    marginBottom: 25,
    alignItems:'center'
  },
  logoContainer:{
    width: 110,
    height: 110,
    display: 'flex',
    justifyContent: 'center',
    borderColor: '#ffffff',
    borderWidth: 6,
    borderRadius: 65,
    paddingTop: 5,
  },
  logo: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    marginTop: 15,
    fontSize: 45,
    fontWeight: '900',
    color: '#ffffff',
  },
  text: {
    fontSize: 25,
    color: '#ffffff',
    fontWeight: '700',
  },
});