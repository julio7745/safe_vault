



import { View, StyleSheet, Text} from 'react-native';

import HomeView from './HomeViews/HomeView';

import NavBar from '../components/common/NavBarComponent';
import Header from '../components/common/HeaderComponent';
import LoadingComponent from '../components/common/LoadingComponent';

export default ({ props }) => {

  /*
  <Header {...{props}}/>
  <HomeView  {...{props}}/>
  <NavBar {...{props}}/>
  <LoadingComponent {...{props}}/>
  */

  return (
    <View style={styles.container}>
        <Text>oi</Text>
    </View>  
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b353b',
    overflow: 'hidden',
    paddingTop: 35,
  }
});