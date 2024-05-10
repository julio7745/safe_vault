
import { useState, useContext } from 'react';
import { View, TouchableWithoutFeedback, Image, Text} from 'react-native';
import { styled } from "nativewind";
import * as ImagePicker from 'expo-image-picker';

import { LoadingContext } from '@/contexts/LoadingContext';

import styles from '@/assets/styles/componentsStyles/profileComponentsStyles/EditProfileImageComponentStyles'

const SView = styled(View)
const SText = styled(Text)
const SImage = styled(Image)

export default ({ editingImage, setEditingImage }) => {

  const [image, setImage] = useState({});
  const { setLoading } = useContext(LoadingContext); 

  const pickImage = async () => {

    setLoading(true)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    });
    if (!result.canceled) {
      const uriParts = result.assets[0].uri.split('.');
      const imgExtension = uriParts[uriParts.length - 1];
  
      setImage({
        uri: result.assets[0].uri,
        base64: result.assets[0].base64,
        imgExtension
      });

    }
    setLoading(false)
  };

  if (!editingImage) return <></>

  return (
    <SView className={styles.EditProfileImageContainer}>
      <SView className={styles.EditProfileImage}>
        <SText className={styles.Title} >New Profile Image</SText>
        { image.uri && 
        <SView className={styles.ContainerImageUser}>
          <SImage 
            source={{ uri: image.uri }}
            className={styles.ImageUser}
            resizeMode='contain'
          />
        </SView>
        }
        <TouchableWithoutFeedback onPress={ pickImage }>
            <SText className={styles.Button}>Select Image</SText>
        </TouchableWithoutFeedback>
        { image.uri &&
          <TouchableWithoutFeedback onPress={() => {} }>
              <SText className={styles.Button}>Confirm</SText>
          </TouchableWithoutFeedback>
        }
        <TouchableWithoutFeedback onPress={() => setEditingImage(false) }>
            <SText className={ styles.Button + styles.Cancel }>Cancel</SText>
        </TouchableWithoutFeedback>
      </SView>
    </SView>
  )

};
