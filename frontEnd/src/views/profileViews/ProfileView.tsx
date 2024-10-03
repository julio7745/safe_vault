
import { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View, Image, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styled } from "nativewind";

import ProfileImage from '@/components/profileComponents/ProfileImageComponent'; 
import FormEditPassword from '@/components/profileComponents/FormEditPasswordComponent';
import EditProfileImageComponent from '@/components/profileComponents/EditProfileImageComponent';
import DeleteProfileComponent from '@/components/profileComponents/DeleteProfileComponent';

import ClearIco from "@/assets/icons/commonIcos/ClearIco.png"
import EditIco from "@/assets/icons/profileIcos/EditIco.png"

import LoadProfileImageHook from '@/hooks/commonHooks/LoadProfileImageHook';
import { useLoading } from '@/contexts/LoadingContext';

import styles from "@/assets/styles/viewsStyles/profileViewsStyles/ProfileViewsStyles"

const SView = styled(View)
const SScrollView = styled(ScrollView)
const SImage = styled(Image)
const SText = styled(Text)

export default () => {

  const [editingImage, setEditingImage] = useState<boolean>(false)
  const [deletingProfile, setDeletingProfile] = useState<boolean>(false)

  const { setLoading } = useLoading()
  
  const [ user, setUserData ] = useState<{
    name: string,
    lastName: string, 
    profileImage: string, 
    profileImageExtension: string
  }>({
    name: '', 
    lastName: '',
    profileImage: '', 
    profileImageExtension: ''
  });

  const props1 = {
    editingImage, setEditingImage,
    deletingProfile, setDeletingProfile,
    user, setUserData
  }

  const LoadProfileImageServices = LoadProfileImageHook()

  const setImage = ({ 
    profileImage, 
    profileImageExtension
  }:{ 
    profileImage: string, 
    profileImageExtension: string 
  }) => {
    setUserData((prevUserData) => { 
      return {
        name: prevUserData.name,
        lastName: prevUserData.lastName,
        profileImage: profileImage,
        profileImageExtension: profileImageExtension
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const user =  JSON.parse( await AsyncStorage.getItem('user') || '' );
      setUserData({ name: user.name, lastName: user.lastName, profileImage: '', profileImageExtension: ''})
      const image = await LoadProfileImageServices.Load({name: user.name, lastName: user.lastName })
      setImage(image)
      setLoading(false)
    };
    fetchData()   
  }, []);
  

  return (
    <SView className={styles.containProfile}>
    
      <SScrollView className={styles.containProfile}>
        <SView className={styles.profile}>

          <SView className={styles.containerProfileImage}>
            <ProfileImage {...{image: user.profileImage, extension: user.profileImageExtension}}/>
            <SView className={styles.btnEditImageProfileContainer}>
              <TouchableWithoutFeedback onPress={() => setEditingImage(true) }>
                <SImage source={EditIco} className={styles.btnEditImageProfile} resizeMode='contain'/>
              </TouchableWithoutFeedback>
            </SView>
          </SView>

          <SView className={styles.containerUserData}>
            <SText className={styles.textBlue}>
              <SText className={styles.strong}>User Name: </SText>{user.name.slice(0,1).toUpperCase()+user.name.slice(1)}
            </SText>
            <SText className={styles.textBlue}>
              <SText className={styles.strong}>User Lastname: </SText>{user.lastName.slice(0,1).toUpperCase()+user.lastName.slice(1)}
            </SText>
          </SView>

          <SView className={styles.containerUserData}>
            <SText className={styles.textBlue + styles.strong}>Edit Password</SText>
            <FormEditPassword />
          </SView>

          <SView className={styles.containerUserData}>
            <SText className={styles.textBlue + styles.strong}>Delete my Profile</SText>
            <TouchableWithoutFeedback onPress={() => setDeletingProfile(true)}>
              <SView className={styles.containerbtnDeleteProfile}>
                <SView className={styles.btnDeleteProfile}>
                  <SImage source={ClearIco} className={styles.icoDeleteProfile} resizeMode='contain'/>
                </SView>
              </SView>
            </TouchableWithoutFeedback>
          </SView>

          
      </SView>
      </SScrollView>

      <EditProfileImageComponent {...props1} />
      <DeleteProfileComponent {...props1} />
      
    </SView>
  );
  
};
