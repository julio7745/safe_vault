

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

    return (
      <SView className={styles.header}>
        <SText className={styles.headerTitle}>{currentPage}</SText>
        <SView className={styles.logoContainer}>
          <SImage source={logo} className={styles.logo} resizeMode='contain'/>
        </SView>
      </SView>  
    );

};