
import { View, StyleSheet, Image, TouchableWithoutFeedback, } from 'react-native';

export default NavBarButton = ({setCurrentPage, icon, currentPage }) => {

  const page = currentPage === 'options' ? 'home' : 'options'

  return (
    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={ ()=> setCurrentPage(page) }>
            <Image source={icon} style={styles.btnIcon}/>
        </TouchableWithoutFeedback>
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
    marginLeft: 10,
    marginRight: 20,
  },
  btnIcon:{
    height: 50,
    width: 50,
  }
  
});
