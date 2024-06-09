
import { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableWithoutFeedback, Image, Keyboard, Text } from 'react-native';
import { styled } from "nativewind";

import SubmitNewPasswordIco from '@/assets/icons/profileIcos/SubmitNewPasswordIco.png'

import styles from '@/assets/styles/componentsStyles/profileComponentsStyles/FormEditPassrordComponentStyles'

const SView = styled(View)
const STextInput = styled(TextInput)
const SText = styled(Text)
const SImage = styled(Image)

export default () => {

  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);

  const [formValue, setFormValue] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [formErros, setformErros] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      unselectField
    );
    return () => keyboardDidHideListener.remove();
  }, []);

  const unselectField = () => {
    currentPasswordRef.current.blur();
    newPasswordRef.current.blur();
    confirmNewPasswordRef.current.blur();
    Keyboard.dismiss();
  };

  return (
    <SView className={styles.EditPasswordForm}>
      <SView className={styles.form}>
        <STextInput
          className={styles.input}
          ref={currentPasswordRef}
          placeholder="Currente Password"
          autoComplete="off"
          maxLength={15}
          value={formValue.currentPassword}
          onChangeText={(text)=>setFormValue({ ...formValue, currentPassword: text })}
        />
        { formErros.currentPassword ? <SText className={styles.error}>{formErros.currentPassword}</SText> : null }
        <STextInput
          className={styles.input}
          ref={newPasswordRef}
          placeholder="New Password"
          autoComplete="off"
          maxLength={15}
          value={formValue.newPassword}
          onChangeText={(text)=>setFormValue({ ...formValue, newPassword: text })}
        />
        { formErros.newPassword ? <SText className={styles.error}>{formErros.newPassword}</SText> : null}
        <STextInput
          className={styles.input}
          ref={confirmNewPasswordRef}
          placeholder="Confirm New Password"
          autoComplete="off"
          maxLength={15}
          value={formValue.confirmNewPassword}
          onChangeText={(text)=>setFormValue({ ...formValue, confirmNewPassword: text })}
        />
        { formErros.confirmNewPassword ? <SText className={styles.error}>{formErros.confirmNewPassword}</SText> : null }
      </SView>
      <TouchableWithoutFeedback onPress={() => unselectField()}>
        <SView className={styles.containerImageSubmit}>
          <SImage source={SubmitNewPasswordIco} className={styles.submitImage} resizeMode='contain'/>
        </SView>
      </TouchableWithoutFeedback>
    </SView>
  );

};
