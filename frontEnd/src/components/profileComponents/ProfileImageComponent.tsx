
import { View, Image, Text } from 'react-native';
import { styled } from "nativewind";

import styles from "@/assets/styles/componentsStyles/profileComponentsStyles/ProfileImageComponentStyles"

import DeafultProfileImage from "@/assets/icons/commonIcos/ProfileIco.png"

const SView = styled(View)
const SImage = styled(Image)

export default ({image}:{image:string}) => {

  const uriImage = `data:image/jpeg;base64,${image}`

  return (
    <SView className={styles.containerimageUser}>
      <SImage 
        source={{ uri: uriImage } || DeafultProfileImage} 
        className={styles.imageUser}
        resizeMode='cover'
      />
      <Text>{}</Text>
    </SView> 

  );
};

