
import { useContext } from 'react';
import { View, Image, } from 'react-native';
import { styled } from "nativewind";

import { CurrentPageContext } from '@/contexts/CurrentPageContext';

import NavBarButton from '../navBar/NavBarButtonComponent'
import MenuIco from '../navBar/MenuIcoComponent'

import styles from '@/assets/styles/componentsStyles/commonComponentsStyles/NavBarComponentStyles'

import HomeIco from '@/assets/icons/navBarIcos/VaultIco.png'
import OpeningsIco from '@/assets/icons/navBarIcos/ListIco.png'
import UserIco from '@/assets/icons/navBarIcos/ProfileIco.png'
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
        <NavBarButton {...{ icon: HomeIco, page: 'home' }}/>
        <NavBarButton {...{ icon: OpeningsIco, page: 'openings' }}/>
        <NavBarButton {...{ icon: UserIco, page: 'profile' }}/>
        <SImage source={VerticalLineIco} className={styles.verticalLine}/>
        <MenuIco {...{ icon: OptionsIco }}/>
      </SView>
    );
  
};
