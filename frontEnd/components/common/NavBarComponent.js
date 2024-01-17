
import { View, StyleSheet, Image, } from 'react-native';

import NavBarButton from '../navBar/NavBarButton'
import MenuIco from '../navBar/MenuIco'

import HomeIco from '../../assets/icons/navBar/vault.png'
import OpeningsIco from '../../assets/icons/navBar/list.png'
import UserIco from '../../assets/icons/navBar/perfil.png'
import OpenOptionsIco from '../../assets/icons/navBar/options.png'
import CloseOptionsIco from '../../assets/icons/navBar/close.png'

const valueToHome = '23.2%'
const valueToOpenings = '50%'
const valueToProfile = '77.5%'
const valueToOther = '10000%'

export default ({ props }) => {

  const leftOfhorizontalLine = 
  props.currentPage === 'home' ? valueToHome :
  props.currentPage === 'openings' ? valueToOpenings :
  props.currentPage === 'profile' ? valueToProfile :
  valueToOther;

  const OptionsIco = 
  props.currentPage === 'options' ? CloseOptionsIco : OpenOptionsIco;

  return (
    <View style={styles.container}>
      <View style={styles.containerBtns}>
        <NavBarButton {...{props, icon: HomeIco, page: 'home', }}/>
        <NavBarButton {...{props, icon: OpeningsIco, page: 'openings', }}/>
        <NavBarButton {...{props, icon: UserIco, page: 'profile', }}/>
        <Image
          source={require('../../assets/icons/navBar/verticalLine.png')}
          style={{...styles.horizontalLine, left: leftOfhorizontalLine}}
        />
      </View>
      <Image source={require('../../assets/icons/navBar/verticalLine.png')} style={styles.verticalLine}/>
      <MenuIco {...{props, icon: OptionsIco }}/>
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
  }
});
