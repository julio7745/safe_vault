
import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import Paho from 'paho-mqtt';
import { styled } from "nativewind";

import CancelOpeningComponent from '@/components/homeComponents/CancelOpeningComponent';
import StateConnectionComponent from '@/components/homeComponents/StateConnectionComponent';

import styles from '@/assets/styles/viewsStyles/homeViewsStyles/RemoveFingerprintViewStyles'

import ilustration from '@/assets/icons/homeIcos/RemoveFingerprint.png'

const SImage = styled(Image)
const SView = styled(View)
const SText = styled(Text)

export default ({ 
  cancelOpeningVisible, 
  setCancelOpeningVisible, 
  stateConection,
  client,
}:{
  cancelOpeningVisible: boolean, 
  setCancelOpeningVisible: Dispatch<SetStateAction<boolean>>, 
  stateConection: string,
  client: Paho.Client | null,
}) => {
  
  const props1 = { 
    cancelOpeningVisible, setCancelOpeningVisible, client 
  }

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
        <SText className={styles.textBtnNext}>Please remove your fingerprint into the local sensor.</SText>
      </SView>
      <TouchableWithoutFeedback onPress={() => setCancelOpeningVisible(true)}>
        <SView className={styles.btnCancel}>
          <SText className={styles.textCancel}>Cancel</SText>
        </SView>
      </TouchableWithoutFeedback>
      <CancelOpeningComponent { ...props1 } />
    </SView>
  );
}
