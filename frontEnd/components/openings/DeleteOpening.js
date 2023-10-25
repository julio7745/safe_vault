
import { View, StyleSheet, Image, TouchableWithoutFeedback, } from 'react-native';

export default ({ opening, setDeletion,  }) => {
  
  return (
    <TouchableWithoutFeedback onPress={() => setDeletion(opening._id) }>
        <View style={styles.campBtnClear}>
            <Image source={require('../../assets/icons/openings/clear.png')} style={styles.btnLogin}/>
        </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  campBtnClear:{
    height: 50,
    width: 50,
    //height: 40,
    //width: 40,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#ffac46',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  btnLogin:{
    width: 40,
    height: 40,
    //width: 35,
    //height: 35,
    resizeMode: 'contain',
    borderRadius: 100,
  }
});