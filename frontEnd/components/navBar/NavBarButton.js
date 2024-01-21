
import { View, StyleSheet, Image, TouchableWithoutFeedback, } from 'react-native';

export default NavBarButton = ({setCurrentPage, icon, page}) => {

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
    marginLeft: 15,
    marginRight: 15,
    marginTop: -10,
  },
  btnIcon:{
    height: 40,
    width: 40,
  }
  
});
