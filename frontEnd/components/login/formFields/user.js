
import { useRef, } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Text, } from 'react-native';

export default UserField = ({inputRefs, setUser, userErrors}) => {

  inputRefs.userField = useRef(null)
  const selectUserField = () => {
     inputRefs.userField.current.focus();
  }

  return (
    <View>
      <View style={styles.field}>
        <TouchableWithoutFeedback onPress={selectUserField}>
          <Image source={require('../../../assets/icons/user.png')} style={styles.icon}/>
        </TouchableWithoutFeedback>
        <TextInput
          style={styles.input}
          placeholder="Name.Lastname"
          autoComplete="off"
          ref={inputRefs.userField}
          onChangeText={(text) => setUser(text)}
          maxLength={35}
        />
      </View>
      {
        userErrors.map((error, index) => (
          <View key={`userError${index}`} style={styles.err}>
            {error ? <Text style={styles.errTxt}>{error}</Text> : null}
          </View>
        ))
      }
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
    width: 260,
    height: 40,
    marginLeft: -30,
    zIndex: 1,
    paddingLeft: 35,
    paddingRight: 15,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    fontSize: 20,
    color: '#305E69',
    display: 'flex',
    alignItems: 'center',
  },
  err:{
    marginLeft: 5,
    marginTop: -5, 
    width: 270,
    borderRadius: 10,
    marginBottom: 10,
  },
  errTxt: {
    color: 'red',
    fontSize: 13.5,
  },
});