
import { View, StyleSheet } from 'react-native';

import HomeView from './HomeViews/HomeView.js';

import NavBar from '../components/common/NavBarComponent';
import Header from '../components/common/HeaderComponent';
import LoadingComponent from '../components/common/LoadingComponent';

export default ({
  currentPage, setCurrentPage,
  loading, setloading,
  user, setUser
  }) => {

    return (
      <View style={styles.container}>
        <Header {...{
          currentPage
        }}/>
        <HomeView  {...{
          currentPage, setCurrentPage,
          setloading,
          user, setUser
        }}/>
        <NavBar {...{
          currentPage, setCurrentPage
        }}/>
        <LoadingComponent {...{ loading }}/>
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