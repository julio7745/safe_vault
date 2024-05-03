
import React from 'react';
import { View } from 'react-native';
import { styled } from "nativewind";

import styles from '@/assets/styles/viewsStyles/LoginViewStyles'

import HeaderLoginComponent from '@/components/loginComponents/HeaderLoginComponent';
import FormLoginComponent from '@/components/loginComponents/FormLoginComponent';

const SView = styled(View)

export default () => {
    return (
      <SView className={styles.loginView}>
        <HeaderLoginComponent />
        <FormLoginComponent />
      </SView>
    );
};

