
import React from 'react';
import { View } from 'react-native';
import { styled } from "nativewind";

import HeaderLoginComponent from '@/components/loginComponents/HeaderLoginComponent';
import FormLoginComponent from '@/components/loginComponents/FormLoginComponent';

import styles from '@/assets/styles/viewsStyles/LoginViewStyles'

const SView = styled(View)

export default () => {
    return (
      <SView className={styles.loginView}>
        <HeaderLoginComponent />
        <FormLoginComponent />
      </SView>
    );
};

