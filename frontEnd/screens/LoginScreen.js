
import { View, StyleSheet } from 'react-native';

import LoginView from './LoginViews/LoginView.js'

import LoadingComponent from '../components/common/LoadingComponent.js';

export default ({ props }) => {
  return (
  <View style={styles.appContainer}>
    <LoginView {...{props}}/>
    <LoadingComponent {...{props}}/>
  </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    height: '100%',
    width: '100%',
    display: "flex",
    backgroundColor: '#1b353b',
    paddingTop: 35,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  }
});