
import { useState } from 'react';
import { TouchableWithoutFeedback, View, Image, Text, ScrollView} from 'react-native';
import { styled } from "nativewind";

import ProfileImage from '@/components/profileComponents/ProfileImageComponent'; 
import FormEditPassword from '@/components/profileComponents/FormEditPasswordComponent';
import EditProfileImageComponent from '@/components/profileComponents/EditProfileImageComponent';

import ClearIco from "@/assets/icons/commonIcos/ClearIco.png"
import EditIco from "@/assets/icons/profileIcos/EditIco.png"

import styles from "@/assets/styles/viewsStyles/profileViewsStyles/ProfileViewsStyles"

const SView = styled(View)
const SScrollView = styled(ScrollView)
const SImage = styled(Image)
const SText = styled(Text)

export default () => {

  const [editingImage, setEditingImage] = useState(false)

  const props1 = {
    editingImage, setEditingImage
  }

  return (
    <SView className={styles.containProfile}>
    
      <SScrollView className={styles.containProfile}>
        <SView className={styles.profile}>

          <SView className={styles.containerProfileImage}>
            <ProfileImage />
            <SView className={styles.btnEditImageProfileContainer}>
              <TouchableWithoutFeedback onPress={() => setEditingImage(true) }>
                <SImage source={EditIco} className={styles.btnEditImageProfile} resizeMode='contain'/>
              </TouchableWithoutFeedback>
            </SView>
          </SView>

          <SView className={styles.containerUserData}>
            <SText className={styles.textBlue}>
              <SText className={styles.strong}>User Name: </SText>Júlio
            </SText>
            <SText className={styles.textBlue}>
              <SText className={styles.strong}>User Lastname: </SText>Carvalho
            </SText>
          </SView>

          <SView className={styles.containerUserData}>
            <SText className={styles.textBlue + styles.strong}>Edit Password</SText>
            <FormEditPassword />
          </SView>

          <SView className={styles.containerUserData}>
            <SText className={styles.textBlue + styles.strong}>Delete my Account</SText>
            <TouchableWithoutFeedback onPress={() => {} }>
              <SView className={styles.containerbtnDeleteAccount}>
                <SView className={styles.btnDeleteAccount}>
                  <SImage source={ClearIco} className={styles.icoDeleteAccount} resizeMode='contain'/>
                </SView>
              </SView>
            </TouchableWithoutFeedback>
          </SView>

          
      </SView>
      </SScrollView>

      <EditProfileImageComponent {...props1} />
      
    </SView>
  );
  
};
