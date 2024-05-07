
import { View } from 'react-native';
import { styled } from "nativewind";

import Screen from '@/router/Screen';

import styles from '@/assets/styles/AppStyles';

const SView = styled(View)

const App = () => {
  return (
    <SView className={styles.app}>
      <Screen />
    </SView>
  );
}

export default App;