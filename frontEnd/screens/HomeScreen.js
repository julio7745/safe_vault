
import { View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default HomeScreen = ({ setCurrentPage, user, currentPage }) => {

  return (
    <View style={styles.content}>
      <Text>NOME: {user.name}</Text>
      <Text>SOBRENOME: {user.lastName}</Text>
      <Text>ID: {user.id}</Text>
      <Text>PAGINA ATUAL: {currentPage}</Text>
      <TouchableWithoutFeedback 
        onPress={ ()=> {
          AsyncStorage.removeItem('user');
          setCurrentPage('login');
        }}
      >
        <Text>LOGOUT</Text>
      </TouchableWithoutFeedback>
    </View>  
  );
};

const styles = StyleSheet.create({
  content: {
    height: '90%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
});
