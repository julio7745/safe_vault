
import { View, ScrollView} from 'react-native';
import { styled } from "nativewind";

import HeaderLoginComponent from '@/components/loginComponents/HeaderLoginComponent';
import FormLoginComponent from '@/components/loginComponents/FormLoginComponent';

import styles from '@/assets/styles/viewsStyles/LoginViewStyles'

const SView = styled(View)
const SScrollView = styled(ScrollView)

export default () => {
  return (
    <SView className={styles.containLogin}>
      <SScrollView className={styles.containLogin}>
      
      <SView className={styles.loginView}>
        <HeaderLoginComponent />
        <FormLoginComponent />
      </SView>

      </SScrollView>
    </SView>
  );
};

