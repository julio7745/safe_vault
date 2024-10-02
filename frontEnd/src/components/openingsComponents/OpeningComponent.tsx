
import { View, Text } from 'react-native';
import { styled } from "nativewind";

import DeleteOpening from './DeleteOpeningComponent'
import ProfileImage from './ProfileImageComponent' 

import styles from '@/assets/styles/componentsStyles/openingComponentsStyles/OpeningComponentStyles'

const SView = styled(View)
const SText = styled(Text)

export default ({ setDeletion, opening }) => {

  const props1 = { setDeletion, _id: opening._id}

  return (
    <SView className={styles.openingContainer}>
      <SView className={styles.opening}>
        <ProfileImage/>
        <SView className={styles.openingTextContainer}>            
          <SText className={styles.openingText}>
            <SText className={styles.strong}>User: </SText>
            {opening.name.charAt(0).toUpperCase() + opening.name.slice(1)}.
            {opening.lastName.charAt(0).toUpperCase() + opening.lastName.slice(1)}
          </SText>
          <SText className={styles.openingText}>
            <SText className={styles.strong}>Date: </SText>
            {opening.month.charAt(0).toUpperCase() + opening.month.slice(1)} {opening.day}
            , {opening.year} at {opening.hour > 12 ? opening.hour-12 : opening.hour}
            :{opening.minute > 9 ? opening.minute : `0${opening.minute}` } {opening.hour > 12 ? 'PM' : 'AM'}
          </SText>
        </SView>
        <DeleteOpening { ...props1 } />
      </SView>
    </SView>
  );
};
