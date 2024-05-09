
import { useContext } from 'react';
import { View, Image, TouchableWithoutFeedback, } from 'react-native';
import { styled } from "nativewind";

import { CurrentPageContext } from '@/contexts/CurrentPageContext';

import VerticalLineIco from '@/assets/icons/navBarIcos/VerticalLineIco.png'

import styles from '@/assets/styles/componentsStyles/navBarComponentsStyles/NavBarButtonComponentStyles'

const SView = styled(View)
const SViewTc = styled(TouchableWithoutFeedback)
const SImage = styled(Image)

export default ({ icon, page }) => {

  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);  
  const renderHorizontalLine = () => {
    return currentPage === page ? 
    <SImage
      source={VerticalLineIco}
      className={styles.horizontalLine}
      resizeMode='contain'
    /> : <></>
  }

  return (
    <SView  className={styles.container}>
      <SViewTc onPress={ ()=> setCurrentPage(page) }>
          <SImage source={icon} className={styles.btnIcon} resizeMode='contain'/>
      </SViewTc>
      {renderHorizontalLine()}
    </SView>
  );

};
