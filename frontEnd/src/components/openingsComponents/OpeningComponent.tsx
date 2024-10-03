
import { View, Text } from 'react-native';
import { styled } from "nativewind";

import DeleteOpening from './DeleteOpeningComponent'
import ProfileImage from './ProfileImageComponent' 

import styles from '@/assets/styles/componentsStyles/openingComponentsStyles/OpeningComponentStyles'

const SView = styled(View)
const SText = styled(Text)

interface openingInterface {
  _id: string
	name: string,
	lastName: string,
	month: string,
	minute: number,
	year: number,
	hour: number,
	day: number,
  empty?: boolean,
  profileImage?: string 
  profileImageExtension?: string 
}

interface ProfileImages {
  [openingId: string]: {
    profileImage: string;
    profileImageExtension: string;
  };
}

export default ({ setDeletion, opening, profileImages}:{
  setDeletion: React.Dispatch<React.SetStateAction<string>>,
  profileImages: ProfileImages
  opening: openingInterface
}) => {

  const props1 = { setDeletion, _id: opening._id}

  const fullName = `${opening.name}_${opening.lastName}`;

  const hour = () => {

    if(opening.hour > 12){
      if ((opening.hour-12) > 9) { 
        return `${opening.hour-12}`
      }else{
        return `0${opening.hour-12}`
      } 
    }else{
      if((opening.hour) > 9) { 
        return `${opening.hour}`
      }else{
        return `0${opening.hour}`
      } 
    }
  }

  return (
    <SView className={styles.openingContainer}>
      <SView className={styles.opening}>
        <ProfileImage {...{image: (profileImages[fullName]?.profileImage) as string, extension: (profileImages[fullName]?.profileImageExtension) as string}}/>
        <SView className={styles.openingTextContainer}>            
          <SText className={styles.openingText}>
            <SText className={styles.strong}>User: </SText>
            {opening.name.charAt(0).toUpperCase() + opening.name.slice(1)}.
            {opening.lastName.charAt(0).toUpperCase() + opening.lastName.slice(1)}
          </SText>
          <SText className={styles.openingText}>
            <SText className={styles.strong}>Date: </SText>
            { opening.month.charAt(0).toUpperCase() + opening.month.slice(1) + " "}
            { opening.day > 9 ? opening.day : `0${opening.day}` + ", "}
            {opening.year  + " at "}
            { hour() }
            :{opening.minute > 9 ? opening.minute : `0${opening.minute}` } {opening.hour > 12 ? 'PM' : 'AM'}
          </SText>
        </SView>
        <DeleteOpening { ...props1 } />
      </SView>
    </SView>
  );
};
