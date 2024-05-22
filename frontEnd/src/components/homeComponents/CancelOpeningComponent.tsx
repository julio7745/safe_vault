
import { useContext } from 'react';
import { View, TouchableWithoutFeedback, Text} from 'react-native';
import { styled } from "nativewind";

import { LoadingContext } from '@/contexts/LoadingContext';

import styles from '@/assets/styles/componentsStyles/homeComponentsStyles/CancelOpeningComponentStyles'

const SView = styled(View)
const SText = styled(Text)

export default ({ cancelOpeningVisible, setCancelOpeningVisible }) => {

  const { setLoading } = useContext(LoadingContext); 

  if (!cancelOpeningVisible) return <></>

  return (
    <SView className={styles.CancelContainer}>
      <SView className={styles.CancelDiv}>
        <SText className={styles.Title} >Cancel Opening</SText>
        <SText className={styles.Text}>Are you sure you want to stop the opening process?</SText>
        <TouchableWithoutFeedback onPress={ () => setCancelOpeningVisible(false) }>
            <SText className={ styles.Button }>Back</SText>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {} }>
            <SText className={ styles.Button + styles.Cancel }>Confirm</SText>
        </TouchableWithoutFeedback>
      </SView>
    </SView>
  )

};
