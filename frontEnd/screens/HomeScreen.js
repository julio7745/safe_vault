
import { View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';

import createOpening from '../services/openings/createOpening.js';
import logout from '../services/login/logout.js';

export default HomeScreen = ({user, setCurrentPage, setloading, }) => {

  return (
    <View style={styles.content}>
      <Text>NOME: {user.name}</Text>
      <Text>SOBRENOME: {user.lastName}</Text>
      <Text>ID: {user.id}</Text>
      <Text>PAGINA ATUAL: home</Text>
      <TouchableWithoutFeedback onPress={() => createOpening({user, setCurrentPage, setloading, })}>
        <Text style={styles.newColeta}>NewColeta</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => logout({...{setloading, setCurrentPage, }})}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableWithoutFeedback>
    </View>  
  );
};

const styles = StyleSheet.create({
  content: {
    height: '82%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  newColeta: {
    backgroundColor: 'green'
  },
  logout: {
    backgroundColor: 'red'
  }
});
