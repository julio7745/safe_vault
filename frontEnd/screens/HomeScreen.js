
import { View, Text} from 'react-native';

export default HomeScreen = ({ setCurrentPage, user, }) => {

  return (
    <View>
      <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
      <Text>{user.name}</Text>
      <Text>{user.lastName}</Text>
      <Text>{user.id}</Text>
    </View>
  );
};
