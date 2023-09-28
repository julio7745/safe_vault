
import { View, StyleSheet, Text, } from 'react-native';

export default HomeScreen = ({user, }) => {

  return (
    <View style={styles.content}>
      <Text>NOME: {user.name}</Text>
      <Text>SOBRENOME: {user.lastName}</Text>
      <Text>ID: {user.id}</Text>
      <Text>PAGINA ATUAL: home</Text>
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
