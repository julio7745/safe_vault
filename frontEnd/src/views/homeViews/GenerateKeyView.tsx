
import { View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styled } from "nativewind";
import Paho from 'paho-mqtt';
import React, { Dispatch, SetStateAction } from 'react';

import LoginHook from '@/hooks/loginHooks/LoginHook';

import StateConnectionComponent from '@/components/homeComponents/StateConnectionComponent';

import styles from '@/assets/styles/viewsStyles/homeViewsStyles/GenerateKeyViewStyles'

import ilustration from '@/assets/icons/homeIcos/GenerateKey.png'

const SImage = styled(Image)
const SView = styled(View)
const SText = styled(Text)


export default ({ 
    stateConection,
    client
  }:{
    stateConection: string
    client: Paho.Client | null
  }) => {

  const LoginServices = LoginHook()

  const StateConnectionProps = {
    stateConection
  }

  const sendMessage = async () => {
    if (client && client.isConnected()) {
      const user = JSON.parse( await AsyncStorage.getItem('user') || '' );
      const message = new Paho.Message(`1_${user.name}.${user.lastName}`);
      message.destinationName = 'safe_vault';
      message.qos = 1;
      client.send(message);
    }
  }

  return (
    <SView className={styles.container}>
      <StateConnectionComponent { ...StateConnectionProps } />
      <SView className={styles.containerIlustration}>
        <SImage source={ilustration} className={styles.ilustration} resizeMode='contain'/>
      </SView>
      <TouchableWithoutFeedback onPressOut={sendMessage}>
        <SView className={styles.campBtnNext}>
          <SText className={styles.textBtnNext}>Generate key for new opening</SText>
        </SView>
      </TouchableWithoutFeedback>
    </SView>
  );
}
