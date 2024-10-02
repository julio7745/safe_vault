
import { View, Image } from 'react-native';
import { styled } from "nativewind";

import styles from "@/assets/styles/componentsStyles/profileComponentsStyles/ProfileImageComponentStyles"

import DeafultProfileImage from "@/assets/icons/commonIcos/ProfileIco.png"

const SView = styled(View)
const SImage = styled(Image)

export default ({image, extension}: {image: string, extension: string}) => {

  const uriImage = `data:image/${extension};base64,${image}`

  return (
    <SView className={styles.containerimageUser}>
      <SImage 
        source={image? { uri: uriImage } : DeafultProfileImage} 
        className={styles.imageUser}
        resizeMode='cover'
      />
    </SView> 

  );
};

