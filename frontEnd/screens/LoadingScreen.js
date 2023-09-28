
import { View, StyleSheet, Text, } from 'react-native';

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
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(27, 53, 59, 0.541)',
    overflow: 'hidden',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
});
