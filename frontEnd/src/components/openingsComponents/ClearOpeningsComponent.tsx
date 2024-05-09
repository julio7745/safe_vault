
import { View, Image, TouchableWithoutFeedback, } from 'react-native';
import { styled } from "nativewind";

import styles from "@/assets/styles/componentsStyles/openingComponentsStyles/ClearOpeningsComponentSyles"

import ClearIco from "@/assets/icons/commonIcos/ClearIco.png"

const SView = styled(View)
const SImage = styled(Image)

export default ({setDeletion}) => {
  
  const selectAll = () => {
    setDeletion('all')
  }

  return (
    <TouchableWithoutFeedback 
      onPress={selectAll}>
      <SView className={styles.ContainercampBtnClear}>
        <SView className={styles.campBtnClear}>
          <SImage source={ClearIco} className={styles.btnClear} resizeMode='contain'/>
        </SView>
      </SView>
    </TouchableWithoutFeedback>
  );
  
};