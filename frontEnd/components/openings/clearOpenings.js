
import { View, StyleSheet, Image, TouchableWithoutFeedback, } from 'react-native';


export default ({setDeletion, }) => {
  
  return (
      <TouchableWithoutFeedback onPress={() => setDeletion('all')}>
        <View style={styles.campBtnClear}>
            <Image source={require('../../assets/icons/openings/clear.png')} style={styles.btnLogin}/>
        </View>
    </TouchableWithoutFeedback>
  );
  
};

const styles = StyleSheet.create({
  campBtnClear:{
    position: 'absolute',
    bottom: 10,
    height: 80,
    width: 80,
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#ffac46',
    borderRadius: 40,
  },
  btnLogin:{
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 100,
  }
});