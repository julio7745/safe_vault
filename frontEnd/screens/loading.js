
import { View, StyleSheet} from 'react-native';

export default loading = () => {

  return (
    <View style={styles.content}>
      <Text>loading</Text>
    </View>  
  );
};

const styles = StyleSheet.create({
  content: {
    height: '100%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
