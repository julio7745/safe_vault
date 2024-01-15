
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';

import HeaderLoginComponent from '../../components/login/HeaderLoginComponent.js';
import FormLoginComponent from '../../components/login/FormLoginComponent.js';

export default ({ props }) => {

  return (
    <KeyboardAvoidingView behavior="height" >
    <View style={styles.content}>
      <HeaderLoginComponent/>
      <FormLoginComponent {...{props}}/>
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