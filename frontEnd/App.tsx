
import { View } from 'react-native';
import { styled } from "nativewind";

import styles from '@/assets/styles/AppStyles';

import Screen from '@/router/Screen';

const SView = styled(View)

const App = () => {
  return (
    <SView className={styles.app}>
      <Screen />
    </SView>
  );
}

export default App;