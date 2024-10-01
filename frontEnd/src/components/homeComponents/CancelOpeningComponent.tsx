
import { Dispatch, SetStateAction } from 'react';
import { View, TouchableWithoutFeedback, Text} from 'react-native';
import Paho from 'paho-mqtt';
import { styled } from "nativewind";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '@/assets/styles/componentsStyles/homeComponentsStyles/CancelOpeningComponentStyles'

const SView = styled(View)
const SText = styled(Text)

export default ({ 
  cancelOpeningVisible, 
  setCancelOpeningVisible, 
  client,
}:{
  cancelOpeningVisible: boolean, 
  setCancelOpeningVisible: Dispatch<SetStateAction<boolean>>, 
  client: Paho.Client | null,
}) => {

  const sendMessage = async () => {
    if (client && client.isConnected()) {
      const user = JSON.parse( await AsyncStorage.getItem('user') || '' );
      const message = new Paho.Message(`4_${user.name}.${user.lastName}`);
      message.destinationName = 'safe_vault';
      message.qos = 1;
      client.send(message);
      setCancelOpeningVisible(false)
    }
  }

  if (!cancelOpeningVisible) return <></>

  return (
    <SView className={styles.CancelContainer}>
      <SView className={styles.CancelDiv}>
        <SText className={styles.Title} >Cancel Opening</SText>
        <SText className={styles.Text}>Are you sure you want to stop the opening process?</SText>
        <TouchableWithoutFeedback onPress={ () => setCancelOpeningVisible(false) }>
            <SText className={ styles.Button }>Back</SText>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={sendMessage}>
            <SText className={ styles.Button + styles.Cancel }>Confirm</SText>
        </TouchableWithoutFeedback>
      </SView>
    </SView>
  )

};
