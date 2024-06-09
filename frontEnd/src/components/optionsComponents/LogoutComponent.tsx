
import { useContext } from 'react';
import { View, TouchableWithoutFeedback, Text} from 'react-native';
import { styled } from "nativewind";

import { CurrentPageContext } from '@/contexts/CurrentPageContext';

import LogoutService from '@/services/commonSevices/LogoutService';

import styles from '@/assets/styles/componentsStyles/optionsComponentsStyles/LogoutComponentStyles'

const SView = styled(View)
const SText = styled(Text)

export default ({ logoutVisible, setLogoutVisible }) => {

  const { setCurrentPage } = useContext(CurrentPageContext);  
  
  if (!logoutVisible) return <></>

  return (
    <SView className={styles.LogoutContainer}>
      <SView className={styles.LogoutDiv}>
        <SText className={styles.Title} >Logout</SText>
        <SText className={styles.Text}>Are you sure you want to log out?</SText>
        <TouchableWithoutFeedback onPress={ () => setLogoutVisible(false) }>
            <SText className={ styles.Button }>Cancel</SText>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={ () => LogoutService({setCurrentPage}) }>
            <SText className={ styles.Button + styles.Cancel }>Confirm</SText>
        </TouchableWithoutFeedback>
      </SView>
    </SView>
  )

};
