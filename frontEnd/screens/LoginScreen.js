
import { View, StyleSheet, } from 'react-native';

import HeaderLogin from '../components/login/loginHeader'
import FormLogin from '../components/login/loginForm'

export default LoginScreen = ({ setcurrentPage, setId }) => {

  return (
    <View style={styles.content}>
      <HeaderLogin/>
      <FormLogin {...{setcurrentPage, setId}}/>
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