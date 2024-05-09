
import { View, StyleSheet, Image, TouchableWithoutFeedback, } from 'react-native';
import { styled } from "nativewind";

import styles from "@/assets/styles/componentsStyles/openingComponentsStyles/DeleteOpeningComponentStyles"

import ClearIco from "@/assets/icons/commonIcos/ClearIco.png"

const SView = styled(View)
const SImage = styled(Image)

export default ({ setDeletion, _id }) => {

  const selectDelection = () => {
    setDeletion(_id)
  }
  
  return (
    <TouchableWithoutFeedback onPress={selectDelection}>
        <SView className={styles.campBtnClear}>
            <SImage source={ClearIco} className={styles.btnLogin} resizeMode='contain'/>
        </SView>
    </TouchableWithoutFeedback>
  );
};
