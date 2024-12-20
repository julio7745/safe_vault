
import { useContext } from 'react';
import { View, Image, } from 'react-native';
import { styled } from "nativewind";

import { CurrentPageContext } from '@/contexts/CurrentPageContext';

import NavBarButtonComponent from '@/components/navBarComponents/NavBarButtonComponent'
import MenuIcoComponent from '@/components/navBarComponents/MenuIcoComponent'

import styles from '@/assets/styles/componentsStyles/commonComponentsStyles/NavBarComponentStyles'

import HomeIco from '@/assets/icons/navBarIcos/VaultIco.png'
import OpeningsIco from '@/assets/icons/navBarIcos/ListIco.png'
import UserIco from '@/assets/icons/commonIcos/ProfileIco.png'
import OpenOptionsIco from '@/assets/icons/navBarIcos/OptionsIco.png'
import CloseOptionsIco from '@/assets/icons/navBarIcos/CloseOptionsIco.png'
import VerticalLineIco from '@/assets/icons/navBarIcos/VerticalLineIco.png'

const SView = styled(View)
const SImage = styled(Image)

export default () => {

    const { currentPage } = useContext(CurrentPageContext);
    const OptionsIco = currentPage === 'options' ? CloseOptionsIco : OpenOptionsIco;

    return (
      <SView className={styles.container}>
        <NavBarButtonComponent {...{ icon: HomeIco, page: 'home' }}/>
        <NavBarButtonComponent {...{ icon: OpeningsIco, page: 'openings' }}/>
        <NavBarButtonComponent {...{ icon: UserIco, page: 'profile' }}/>
        <SImage source={VerticalLineIco} className={styles.verticalLine}/>
        <MenuIcoComponent {...{ icon: OptionsIco }}/>
      </SView>
    );
  
};
