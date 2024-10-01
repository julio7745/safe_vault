
import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, Image } from 'react-native';
import Paho from 'paho-mqtt';
import { styled } from "nativewind";

import StateConnectionComponent from '@/components/homeComponents/StateConnectionComponent';

import styles from '@/assets/styles/viewsStyles/homeViewsStyles/WaitingOpeningViewStyles'

import ilustration from '@/assets/icons/homeIcos/WaitingOpening.png'

const SImage = styled(Image)
const SView = styled(View)
const SText = styled(Text)

export default ({ 
  stateConection,
}:{
  cancelOpeningVisible: boolean, 
  setCancelOpeningVisible: Dispatch<SetStateAction<boolean>>, 
  stateConection: string,
  client: Paho.Client | null,
}) => {

  const StateConnectionProps = {
    stateConection
  }
  
  return (
    <SView className={styles.container}>
       <StateConnectionComponent { ...StateConnectionProps } />
      <SView className={styles.containerIlustration}>
        <SImage source={ilustration} className={styles.ilustration} resizeMode='contain'/>
      </SView>
      <SView className={styles.campText}>
        <SText className={styles.textBtnNext}>You have 30 seconds to open the safe.</SText>
      </SView>
    </SView>
  );
}
