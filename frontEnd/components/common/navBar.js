
import { View, StyleSheet, Image, } from 'react-native';

import NavBarButton from '../navBar/navBarButton'

// Buttons
// Home
import HomeIco from '../../assets/icons/navBar/vault.png'
import OpeningsIco from '../../assets/icons/navBar/list.png'
import UserIco from '../../assets/icons/navBar/perfil.png'
import OptionsIco from '../../assets/icons/navBar/options.png'

let leftOfhorizontalLine = 60;
//leftOfhorizontalLine = currentPage === 'home' ? 60: currentPage === 'openings' ? 140 : 220;

export default NavBar = ({setCurrentPage, currentPage}) => {

  return (
    <View style={styles.container}>
      <View style={styles.containerBtns}>
        <NavBarButton {...{setCurrentPage, icon: HomeIco, page: 'home', }}/>
        <NavBarButton {...{setCurrentPage, icon: OpeningsIco, page: 'home', }}/>
        <NavBarButton {...{setCurrentPage, icon: UserIco, page: 'home', }}/>
      </View>
      <Image source={require('../../assets/icons/navBar/verticalLine.png')} style={styles.horizontalLine}/>
      <Image source={require('../../assets/icons/navBar/verticalLine.png')} style={styles.verticalLine}/>
      <NavBarButton {...{setCurrentPage, icon: OptionsIco, page: 'home', }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#1b353b',
    overflow: 'hidden',
  },
  containerBtns: {
    height: '100%',
    width: '75%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalLine:{
    resizeMode: 'cover',
    height: 75,
    width: 20,
    transform: [{ rotate: '90deg'}, { translateX: -8}],
    position: 'absolute',
    top: 35,
    left: leftOfhorizontalLine,
  },
  verticalLine: {
    height: 80,
    width: 15,
  },
});
