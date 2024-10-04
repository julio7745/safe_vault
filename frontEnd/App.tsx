
import { View, Appearance  } from 'react-native';
import { styled } from "nativewind";

import { LoadingProvider } from '@/contexts/LoadingContext';
import Screen from '@/router/Screen';

import styles from '@/assets/styles/AppStyles';

const SView = styled(View)

const App = () => {

  Appearance.setColorScheme('light');

  return (
  <LoadingProvider>
    <SView className={styles.app}>
      <Screen />
    </SView>
  </LoadingProvider>
  );
}

export default App;
