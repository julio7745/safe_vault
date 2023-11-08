
import { View, StyleSheet, KeyboardAvoidingView} from 'react-native';

import HeaderLogin from '../components/login/LoginHeader'
import FormLogin from '../components/login/LoginForm'

export default ({ setCurrentPage, setUser, setloading, }) => {

  return (
    <KeyboardAvoidingView behavior="height" >
    <View style={styles.content}>
      <HeaderLogin/>
      <FormLogin {...{ setCurrentPage, setUser, setloading, }}/>
    </View>
    </KeyboardAvoidingView>
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