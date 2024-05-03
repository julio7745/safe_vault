
import { StyleSheet } from 'react-native';

import color from '@/assets/configs/colorsConfig'
const webStyles = StyleSheet.create({
  LoginScreen: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color[2],
    padding: 30,
    borderRadius: 10,
  }
});

const styles = webStyles
export default styles