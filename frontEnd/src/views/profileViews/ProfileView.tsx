
import { useState } from 'react';
import { TouchableWithoutFeedback, View, Image, Text} from 'react-native';
import { styled } from "nativewind";

import ProfileImage from '@/components/profileComponents/ProfileImageComponent'; 
import FormEditPassword from '@/components/profileComponents/FormEditPasswordComponent';
import EditProfileImageComponent from '@/components/profileComponents/EditProfileImageComponent';

import ClearIco from "@/assets/icons/commonIcos/ClearIco.png"
import EditIco from "@/assets/icons/profileIcos/EditIco.png"

import styles from "@/assets/styles/viewsStyles/profileViewsStyles/ProfileViewsStyles"

const SView = styled(View)
const SViewTc = styled(TouchableWithoutFeedback)
const SImage = styled(Image)
const SText = styled(Text)

export default () => {

  const [editingImage, setEditingImage] = useState(false)

  const props1 = {
    editingImage, setEditingImage
  }

  return (
    <SView className={styles.containProfile}>
        <SView className={styles.profile}>

          <SView className={styles.containerProfileImage}>
            <ProfileImage />
            <SView className={styles.btnEditImageProfileContainer}>
              <SViewTc onPress={() => setEditingImage(true) }>
                <SImage source={EditIco} className={styles.btnEditImageProfile} resizeMode='contain'/>
              </SViewTc>
            </SView>
          </SView>

          <SView className={styles.containerUserData}>
            <Text>
              <SText className={styles.strong}>User Name: </SText>Júlio
            </Text>
            <Text>
              <SText className={styles.strong}>User Lastname: </SText>Carvalho
            </Text>
          </SView>

          <SView className={styles.containerUserData}>
            <SText className={styles.strong}>Edit Password</SText>
            <FormEditPassword />
          </SView>

          <SView className={styles.containerUserData}>
            <SText className={styles.strong}>Delete my Account</SText>
            <SViewTc onPress={() => {} }>
              <SView className={styles.containerbtnDeleteAccount}>
                <SView className={styles.btnDeleteAccount}>
                  <SImage source={ClearIco} className={styles.icoDeleteAccount} resizeMode='contain'/>
                </SView>
              </SView>
            </SViewTc>
          </SView>

          <EditProfileImageComponent {...props1} />
          
      </SView>
    </SView>
  );
  
};
