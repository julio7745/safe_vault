
import { StyleSheet } from 'react-native';

import color from '@/assets/configs/colorsConfig'
const webStyles = StyleSheet.create({
  app: {
    height: '100%',
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color[1],
  }
});

const styles = webStyles
export default styles