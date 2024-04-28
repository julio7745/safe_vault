
import { View, StyleSheet, Image, } from 'react-native';

import NavBarButton from '../navBar/NavBarButtonComponent'
import MenuIco from '../navBar/MenuIcoComponent'

import HomeIco from '../../assets/icons/navBar/vault.png'
import OpeningsIco from '../../assets/icons/navBar/list.png'
import UserIco from '../../assets/icons/navBar/perfil.png'
import OpenOptionsIco from '../../assets/icons/navBar/options.png'
import CloseOptionsIco from '../../assets/icons/navBar/close.png'

export default ({
  currentPage, setCurrentPage
  }) => {

    const OptionsIco = 
    currentPage === 'options' ? CloseOptionsIco : OpenOptionsIco;

    return (
      <View style={styles.container}>
        <View style={styles.containerBtns}>
          <NavBarButton {...{setCurrentPage, icon: HomeIco, page: 'home', currentPage }}/>
          <NavBarButton {...{setCurrentPage, icon: OpeningsIco, page: 'openings', currentPage }}/>
          <NavBarButton {...{setCurrentPage, icon: UserIco, page: 'profile', currentPage }}/>
        </View>
        <Image source={require('../../assets/icons/navBar/verticalLine.png')} style={styles.verticalLine}/>
        <MenuIco {...{currentPage, setCurrentPage, icon: OptionsIco }}/>
      </View>
    );
  
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b353b',
    overflow: 'hidden',
  },
  containerBtns: {
    height: '100%',
    width: 'auto',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLine: {
    height: 80,
    width: 15,
  }
});
