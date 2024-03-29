
import { View, StyleSheet, Text } from 'react-native';

export default ({ loading }) => {

  if ( loading ) return (
    <View style={styles.loading}>
      <Text  style={styles.loadingText}>loading ...</Text>
    </View>  
  );
  
};

const styles = StyleSheet.create({
  loading: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 35,
    left: 0,
    backgroundColor: '#1b353b8a',
    overflow: 'hidden',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText:{
    color: '#ffffff',
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 35,
  }
});
