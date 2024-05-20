

import React, { useContext } from 'react';
import { View, Text, Image, } from 'react-native';
import { styled } from "nativewind";

import { CurrentPageContext } from '@/contexts/CurrentPageContext';

import styles from '@/assets/styles/componentsStyles/commonComponentsStyles/HearderComponentStyles'

import logo from '@/assets/imgs/logoClara1.png'

const SView = styled(View)
const SText = styled(Text)
const SImage = styled(Image)

export default () => {
  
  const { currentPage } = useContext(CurrentPageContext);

  let headerText;
  if (currentPage === 'home') {
    headerText = 'New opening';
  } else {
    headerText = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
  }


    return (
      <SView className={styles.header}>
        <SText className={styles.headerTitle}>
          { currentPage === 'home' ? 'New opening' : currentPage.charAt(0).toUpperCase() + currentPage.slice(1) }
        </SText>
        <SView className={styles.logoContainer}>
          <SImage source={logo} className={styles.logo} resizeMode='contain'/>
        </SView>
      </SView>  
    );

};