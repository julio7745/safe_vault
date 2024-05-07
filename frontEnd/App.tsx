
import { View } from 'react-native';
import { styled } from "nativewind";

import { LoadingProvider } from '@/contexts/LoadingContext';

import Screen from '@/router/Screen';

import styles from '@/assets/styles/AppStyles';

const SView = styled(View)

const App = () => {
  return (
  <LoadingProvider>
    <SView className={styles.app}>
      <Screen />
    </SView>
  </LoadingProvider>
  );
}

export default App;