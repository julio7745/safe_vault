
import { View, StyleSheet, Image, } from 'react-native';

import NavBarButton from '../navBar/navBarButton'

// Buttons
// Home
import HomeIco from '../../assets/icons/navBar/vault.png'
import OpeningsIco from '../../assets/icons/navBar/list.png'
import UserIco from '../../assets/icons/navBar/perfil.png'
import OptionsIco from '../../assets/icons/navBar/options.png'

export default NavBar = ({setCurrentPage, currentPage}) => {

  const leftOfhorizontalLine = 
  currentPage === 'home' ? '23.2%' :
  currentPage === 'openings' ? '50%' :
  currentPage === 'user' ? '77.5%':
  '22.5%';

  return (
    <View style={styles.container}>
      <View style={styles.containerBtns}>
        <NavBarButton {...{setCurrentPage, icon: HomeIco, page: 'home', }}/>
        <NavBarButton {...{setCurrentPage, icon: OpeningsIco, page: 'openings', }}/>
        <NavBarButton {...{setCurrentPage, icon: UserIco, page: 'user', }}/>
        <Image
          source={require('../../assets/icons/navBar/verticalLine.png')}
          style={{...styles.horizontalLine, left: leftOfhorizontalLine}}
        />
      </View>
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
    height: 70,
    width: 70,
    transform: [{ rotate: '90deg'}, { translateY: 36}],
    position: 'absolute',
    top: 25,
    
  },
  verticalLine: {
    height: 80,
    width: 15,
  },
});
