
import { View, Text, TouchableWithoutFeedback} from 'react-native';
import { styled } from "nativewind";

import styles from "@/assets/styles/componentsStyles/openingComponentsStyles/ConfirmDeletionComponentSyles"

const SView = styled(View)
const SText = styled(Text)

export default ({ deletion, setDeletion }) => {

  const cancelDeletion = () => {
    setDeletion('');
  }

  const confirmDeletion = () => {
    setDeletion('');
  }

  if (!deletion) return (<></>)

  return (
    <SView className={styles.ConfirmDeletionContainer}>
      <SView className={styles.ConfirmDeletionDiv}>
        <SText className={styles.Title}>Confirm?</SText>
        {
          deletion !== 'all' && 
          <SText className={styles.Text}>Are you sure you want to delete this opening forever? That's a long time!</SText>
        }
        {
          deletion === 'all' && 
          <SText className={styles.Text}>Are you sure you want to delete all opening forever? That's a long time!</SText>
        }
          <TouchableWithoutFeedback 
            onPress={cancelDeletion}>
            <SText className={ styles.Button }>Cancel</SText>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={confirmDeletion}>
            <SText className={ styles.Button + styles.Cancel}>Confirm</SText>
          </TouchableWithoutFeedback>
      </SView>
    </SView>
  );

};
