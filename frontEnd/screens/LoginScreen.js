
import { View, StyleSheet, } from 'react-native';
import { useEffect } from 'react';

import HeaderLogin from '../components/login/loginHeader'
import FormLogin from '../components/login/loginForm'

//import StorageUser from '../services/login/storageUser';

export default LoginScreen = ({ setCurrentPage, setUser, }) => {

  useEffect(() => {
    
    //StorageUser.load({ setCurrentPage, setUser, });

  }, []);

  return (
    <View style={styles.content}>
      <HeaderLogin/>
      <FormLogin {...{ setCurrentPage, setUser, }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    height: '100%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b353b',
    overflow: 'hidden',
  }
});