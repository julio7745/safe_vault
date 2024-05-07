
import { useContext } from 'react'
import { View, Image, TouchableWithoutFeedback, } from 'react-native';
import { styled } from "nativewind";

import { CurrentPageContext } from '@/contexts/CurrentPageContext';

import styles from '@/assets/styles/componentsStyles/navBarComponentsStyles/MenuIcoComponentStyles'

const SView = styled(View)
const SImage = styled(Image)

export default ({ icon }) => {

  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const page = currentPage === 'options' ? 'home' : 'options'

  return (
    <SView className={styles.container}>
        <TouchableWithoutFeedback onPress={ ()=> setCurrentPage(page) }>
            <SImage source={icon} className={styles.btnIcon} style={{resizeMode: 'contain'}}/>
        </TouchableWithoutFeedback>
    </SView>
  );

};
