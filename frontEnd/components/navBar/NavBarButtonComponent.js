
import { View, StyleSheet, Image, TouchableWithoutFeedback, } from 'react-native';

export default NavBarButton = ({setCurrentPage, icon, page, currentPage}) => {

  const renderHorizontalLine = () => {
    return currentPage === page ? 
    <Image
      source={require('../../assets/icons/navBar/verticalLine.png')}
      style={{...styles.horizontalLine}}
    /> : <></>
  }

  return (
    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={ ()=> setCurrentPage(page) }>
            <Image source={icon} style={styles.btnIcon}/>
        </TouchableWithoutFeedback>
        {renderHorizontalLine()}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b353b',
    overflow: 'hidden',
    marginLeft: 15,
    marginRight: 15,
    marginTop: -10,
  },
  btnIcon:{
    height: 40,
    width: 40,
  },
  horizontalLine:{
    resizeMode: 'cover',
    height: 70,
    width: 70,
    transform: [{ rotate: '90deg'}, { translateY: '50%'}],
    position: 'absolute',
    left: '50%',
    top: 0,
    marginTop: 15,
    marginTop: 15,
  }
});