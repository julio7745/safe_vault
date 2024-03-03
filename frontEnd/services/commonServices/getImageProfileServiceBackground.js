
import BackgroundTimer from 'react-native-background-timer';

let backgroundTaskId;

const getImageProfileServiceBackground = async (params) => {

  const backgroundTask =  async () => {
    console.log(params);
    stopBackgroundTask()
  };

  const startBackgroundTask = () => {
    backgroundTaskId = BackgroundTimer.runBackgroundTimer(() => {
      backgroundTask();
    }, 15 * 60 * 1000);
  };

  const stopBackgroundTask = () => {
    if (backgroundTaskId) {
      BackgroundTimer.stopBackgroundTimer();
      backgroundTaskId = undefined;
    }
  };

  startBackgroundTask();

};

export default getImageProfileServiceBackground;