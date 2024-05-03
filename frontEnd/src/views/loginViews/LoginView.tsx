
import React from 'react';
import { View, StyleSheet} from 'react-native';

import HeaderLoginComponent from '@/components/loginComponents/HeaderLoginComponent';
import FormLoginComponent from '@/components/loginComponents/FormLoginComponent';

export default () => {
    return (
      <View style={styles.loginView}>
        <HeaderLoginComponent />
        <FormLoginComponent />
      </View>
    );
};

const styles = StyleSheet.create({
  loginView: {
    height: '100%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'
  }
});

