import { Platform, StatusBar } from 'react-native';

export const marginTop = Platform.OS === 'ios' ? 15 : StatusBar.currentHeight;
export const marginHorizontal = 15;

export const defaultLocale = 'fr';
export const nameTokenAuth = 'driing_auth';

export const isNotEmpty = (data) => data !== null && data !== '';
export const isNotEmptyArray = (data) => data !== null && data.length > 0;
