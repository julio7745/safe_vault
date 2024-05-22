
import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { styled } from "nativewind";

import CancelOpeningComponent from '@/components/homeComponents/CancelOpeningComponent';

import styles from '@/assets/styles/viewsStyles/homeViewsStyles/InsertKeyViewStyles'

import ilustration from '@/assets/icons/homeIcos/InsertKey.png'

const SImage = styled(Image)
const SView = styled(View)
const SText = styled(Text)

export default ({ cancelOpeningVisible, setCancelOpeningVisible }) => {
  
  const props1 = { cancelOpeningVisible, setCancelOpeningVisible }

  return (
    <SView className={styles.container}>
      <SView className={styles.containerIlustration}>
        <SImage source={ilustration} className={styles.ilustration} resizeMode='contain'/>
      </SView>
      <SView className={styles.campText}>
        <SText className={styles.text}>Please enter the key on the local keyboard.</SText>
        <SText className={styles.key}>1 2 3 4</SText>
      </SView>
      <TouchableWithoutFeedback onPress={() => setCancelOpeningVisible(true)}>
        <SView className={styles.btnCancel}>
          <SText className={styles.textCancel}>Cancel</SText>
        </SView>
      </TouchableWithoutFeedback>
      <CancelOpeningComponent { ...props1 } />
    </SView>
  );
}