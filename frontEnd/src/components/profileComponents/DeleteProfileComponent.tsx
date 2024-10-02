
import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableWithoutFeedback, Text, TextInput, Keyboard} from 'react-native';
import { styled } from "nativewind";

import DeleteProfileHooks from '@/hooks/profileHooks/DeleteProfileHooks';

import styles from '@/assets/styles/componentsStyles/profileComponentsStyles/DeleteProfileComponentStyles'

const SView = styled(View)
const SText = styled(Text)
const STextInput = styled(TextInput)

export default (
  { deletingProfile, setDeletingProfile, user, setUserData}:
  { 
    deletingProfile: boolean,
    setDeletingProfile: React.Dispatch<React.SetStateAction<boolean>>,
    user: { name: string, lastName: string, profileImage: string, profileImageExtension: string}
    setUserData: React.Dispatch<React.SetStateAction<{ name: string, lastName: string, profileImage: string, profileImageExtension: string}>>
  }) => {

  const DeleteProfileServices = DeleteProfileHooks()

  const [formValue, setFormValue] = useState<{currentPassword: string}>({currentPassword:''})
  const [formErros, setFormErros] = useState<{currentPassword: string[]}>({currentPassword:[]})

  const currentPasswordRef = useRef<TextInput>(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      unselectField
    );
    return () => keyboardDidHideListener.remove();
  }, []);

  const unselectField = () => {
    currentPasswordRef.current?.blur();
    Keyboard.dismiss();
  };

  if (!deletingProfile) return <></>

  return (
    <SView className={styles.DeleteProfileContainer}>
      <SView className={styles.DeleteProfileDiv}>
        <SText className={styles.Title} >Delete my Profile</SText>
        <SText className={styles.Text}>Enter your password to delete your profile?</SText>

        <STextInput
          className={styles.input}
          ref={currentPasswordRef}
          placeholder="Currente Password"
          autoComplete="off"
          maxLength={15}
          value={formValue.currentPassword}
          onChangeText={(text)=>setFormValue({ currentPassword: text })}
        />
        { formErros.currentPassword[0] ? <SText className={styles.error}>{formErros.currentPassword[0]}</SText> : null }

        <TouchableWithoutFeedback onPress={ () => setDeletingProfile(false) }>
            <SText className={ styles.Button }>Cancel</SText>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => DeleteProfileServices.DeleteProfileService({formValue, setFormErros}) }>
            <SText className={ styles.Button + styles.Cancel }>Confirm</SText>
        </TouchableWithoutFeedback>
      </SView>
    </SView>
  )

};
