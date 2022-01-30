import { Platform, StatusBar } from 'react-native';

export const marginTop = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const marginHorizontal =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;