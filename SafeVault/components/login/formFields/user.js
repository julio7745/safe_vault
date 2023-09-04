
import React, { useRef, } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableWithoutFeedback, } from 'react-native';

export default UserField = ({inputRefs, setUser}) => {

  inputRefs.userField = useRef(null)
  const selectUserField = () => {
     inputRefs.userField.current.focus();
  }

  return (
    <View style={styles.field}>
      <TouchableWithoutFeedback onPress={selectUserField}>
        <Image source={require('../../../assets/icons/user.png')} style={styles.icon}/>
      </TouchableWithoutFeedback>
      <TextInput
        style={styles.input}
        placeholder="name.surname"
        autoComplete="off"
        ref={inputRefs.userField}
        onChangeText={(text) => setUser(text)}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
  field:{
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  icon:{
    width: 45,
    height: 45,
    zIndex: 2,
    borderRadius: 50,
    backgroundColor: '#ffffff',
  },
  input:{
    width: 240,
    height: 40,
    marginLeft: -12,
    zIndex: 1,
    paddingLeft: 20,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    fontSize: 20,
    color: '#305E69',
    display: 'flex',
    alignItems: 'center',
  },
});