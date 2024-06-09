
import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import { styled } from "nativewind";

import styles from '@/assets/styles/viewsStyles/homeViewsStyles/GenerateKeyViewStyles'

import ilustration from '@/assets/icons/homeIcos/GenerateKey.png'
import httpRequestService from '@/services/commonSevices/httpRequestService';

const SImage = styled(Image)
const SView = styled(View)
const SText = styled(Text)

export default () => {
  return (
    <SView className={styles.container}>
      <SView className={styles.containerIlustration}>
        <SImage source={ilustration} className={styles.ilustration} resizeMode='contain'/>
      </SView>
      <TouchableWithoutFeedback onPressOut={() => console.log(`oi`)}>
        <SView className={styles.campBtnNext}>
          <SText className={styles.textBtnNext}>Generate key for new opening</SText>
        </SView>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPressOut={ () => httpRequestService.get('login/oi')}>
        <SView className={styles.campBtnNext}>
          <SText className={styles.textBtnNext}>test get</SText>
        </SView>
      </TouchableWithoutFeedback>
      </SView>
  );
}
