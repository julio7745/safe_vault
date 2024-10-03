
import { useContext } from 'react'
import { View, Image, Text } from 'react-native';
import { styled } from "nativewind";

import { LoadingContext } from '@/contexts/LoadingContext';

import styles from '@/assets/styles/componentsStyles/commonComponentsStyles/LoadingComponentStyles'

import logo from '@/assets/imgs/logoClara1.png'

const SView = styled(View)
const SImage = styled(Image)
const SText = styled(Text)

export default () => {

  const { loading } = useContext(LoadingContext);

  if ( loading ) return (
    <SView className={styles.loading}>
      <SView className={styles.border}>
        <SView className={styles.border2}>
          <SView className={styles.logoContainer}>
            <SImage source={logo} className={styles.logo} resizeMode='contain'/>
          </SView>
        </SView>  
      </SView>  
      <SText className={styles.loadingText}>Loading ...</SText>
    </SView>  
    );

};


