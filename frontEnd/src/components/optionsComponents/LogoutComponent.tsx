
import { View, TouchableWithoutFeedback, Text} from 'react-native';
import { styled } from "nativewind";

import LogoutHook from '@/hooks/commonHooks/LogoutHook';

import styles from '@/assets/styles/componentsStyles/optionsComponentsStyles/LogoutComponentStyles'

const SView = styled(View)
const SText = styled(Text)

export default ({ logoutVisible, setLogoutVisible }) => {

  const logout = LogoutHook();

  if (!logoutVisible) return <></>

  return (
    <SView className={styles.LogoutContainer}>
      <SView className={styles.LogoutDiv}>
        <SText className={styles.Title} >Logout</SText>
        <SText className={styles.Text}>Are you sure you want to log out?</SText>
        <TouchableWithoutFeedback onPress={ () => setLogoutVisible(false) }>
            <SText className={ styles.Button }>Cancel</SText>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={ logout }>
            <SText className={ styles.Button + styles.Cancel }>Confirm</SText>
        </TouchableWithoutFeedback>
      </SView>
    </SView>
  )

};
