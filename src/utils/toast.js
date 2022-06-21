import Toast from 'react-native-root-toast';

export const toastError = (msg) =>
  Toast.show(msg, {
    duration: Toast.durations.LONG,
    backgroundColor: 'red',
    textColor: 'white',
    position: Toast.positions.BOTTOM,
  });

export const toastSuccess = (msg) =>
  Toast.show(msg, {
    duration: Toast.durations.LONG,
    backgroundColor: 'green',
    textColor: 'white',
    position: Toast.positions.BOTTOM,
  });
