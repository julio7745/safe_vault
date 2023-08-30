import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Registra o componente principal do aplicativo para renderização
AppRegistry.registerComponent(appName, () => App);
