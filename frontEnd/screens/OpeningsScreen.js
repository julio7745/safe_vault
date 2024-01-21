
import { View, StyleSheet } from 'react-native';

import OpeningListView from './OpeningViews/OpeningListView.js';

import NavBar from '../components/common/NavBarComponent';
import Header from '../components/common/HeaderComponent';
import LoadingComponent from '../components/common/LoadingComponent';

export default ({
  currentPage, setCurrentPage,
  loading, setloading,
  user
  }) => {

    return (
      <View style={styles.container}>
        <Header {...{
          currentPage
        }}/>
        <OpeningListView  {...{
          setCurrentPage,
          setloading,
          user
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