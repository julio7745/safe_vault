
import { View, StyleSheet, } from 'react-native';

import HeaderLogin from '../components/login/loginHeader'
import FormLogin from '../components/login/loginForm'

export default LoginScreen = ({ setcurrentPage, setUser }) => {

  return (
    <View style={styles.content}>
      <HeaderLogin/>
      <FormLogin setcurrentPage={setcurrentPage} setUSer={setUser}/>
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
    backgroundColor: '#305E69',
    overflow: 'hidden',
  }
});