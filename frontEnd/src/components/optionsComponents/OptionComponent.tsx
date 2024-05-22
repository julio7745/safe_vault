
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styled } from "nativewind";

import styles from '@/assets/styles/componentsStyles/optionsComponentsStyles/OptionComponentStyles'

const SView = styled(View)
const SText = styled(Text)

export default ({ page }) => {

  return (
    <TouchableWithoutFeedback onPress={page.function }>
      <SView className={styles.page}>
        <SText className={styles.name}>{
          page.name.charAt(0).toUpperCase() + page.name.slice(1)
        }</SText>
      </SView>
    </TouchableWithoutFeedback>
  );

};
