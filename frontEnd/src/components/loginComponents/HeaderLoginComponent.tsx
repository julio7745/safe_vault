
import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from "nativewind";

import styles from '@/assets/styles/componentsStyles/loginComponentsStyles/HeaderLoginComponentStyles'

import logo from '@/assets/imgs/logoClara1.png'

const SView = styled(View)
const SText = styled(Text)
const SImage = styled(Image)

export default () => {

  return (
    <SView className={styles.header}>
      <SView className={styles.logoContainer}>      
        <SImage source={logo} className={styles.logo} resizeMode='contain'/>
      </SView>
      <SText className={styles.title}>Safe Vault</SText>
      <SText className={styles.text}>Welcome back!</SText>
    </SView>
  );
  
};
