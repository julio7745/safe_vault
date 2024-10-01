
import React from 'react';
import { Text } from 'react-native'
import { styled } from "nativewind";

import styles from "@/assets/styles/componentsStyles/homeComponentsStyles/StateConnectionComponentStyles"

const SText = styled(Text)

export default ({stateConection}:{stateConection:string}) => {
  return (
    <>
      <SText className={styles.ConectionState}>State: {stateConection}</SText>
    </>
  );
}