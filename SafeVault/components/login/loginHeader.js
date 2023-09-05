
import { View, Text, StyleSheet, Image, } from 'react-native';

export default HeaderLogin = () => {

  return (
    <View style={styles.header}>
        <Image source={{ uri: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRYpvpf_QxhPhSRQnwHPIoX__UnoVlsvBhZsH6vghi0O7mTsHhLrcTVvzrz55FW4pNlVI-iio_CSvtLSdc2Qlhyjb4MV4kjrGu70u1Yf97QyvYGIkW8O6GC&usqp=CAc' }} style={styles.logo} />
          <Text style={styles.title}>Safe Vault</Text>
          <Text style={styles.text}>Welcome back!</Text>
    </View>
  );
  
};

const styles = StyleSheet.create({
  header:{
    marginBottom: 25,
  },
  logo: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    marginTop: 25,
  },
  title: {
    marginTop: 15,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  text: {
    fontSize: 20,
    color: '#ffffff',
  },
});