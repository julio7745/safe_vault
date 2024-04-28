
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';

import HeaderLoginComponent from '../../components/login/HeaderLoginComponent.js';
import FormLoginComponent from '../../components/login/FormLoginComponent.js';

export default ({
    setCurrentPage,
    setLoading,
    setUser
  }) => {
    return (
      <KeyboardAvoidingView behavior="padding" enabled >
      <View style={styles.content}>
        <HeaderLoginComponent />
        <FormLoginComponent {...{
          setCurrentPage,
          setLoading,
          setUser
        }}/>
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