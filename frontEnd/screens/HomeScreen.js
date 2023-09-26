
import { View, Text, TouchableWithoutFeedback, } from 'react-native';

export default HomeScreen = ({ setCurrentPage, user, }) => {

  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.lastName}</Text>
      <Text>{user.id}</Text>
      <TouchableWithoutFeedback onPress={() => setCurrentPage('login')}>
        <Text>
          voltar
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
