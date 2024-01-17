
import { View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';

import createOpening from '../../services/openingsServices/createOpeningService'
import logout from '../../services/loginServices/logoutService';

export default ({props}) => {

  return (
    <View style={styles.content}>
      <Text>NOME: {props.user.name}</Text>
      <Text>SOBRENOME: {props.user.lastName}</Text>
      <Text>ID: {props.user._id}</Text>
      <Text>PAGINA ATUAL: {props.currentPage}</Text>
      <TouchableWithoutFeedback onPress={() => createOpening( {...{props}} )}>
        <Text style={styles.newColeta}>NewColeta</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => logout( {...{props}} )}>
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
