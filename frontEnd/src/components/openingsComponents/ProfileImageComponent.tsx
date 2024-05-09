
import { useState } from 'react';
import { View, Image } from 'react-native';
import { styled } from "nativewind";

import styles from "@/assets/styles/componentsStyles/openingComponentsStyles/ProfileImageComponent"

import DeafultProfileImage from "@/assets/icons/commonIcos/ProfileIco.png"

const SView = styled(View)
const SImage = styled(Image)

export default () => {
  
  const [image, setImage] = useState();

  return (
    <SView className={styles.containerimageUser}>
      <SImage 
        source={image || DeafultProfileImage} 
        className={styles.imageUser}
        resizeMode='contain'
      />
    </SView> 

  );
};