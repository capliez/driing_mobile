import { Appearance } from 'react-native';

const INIT_STATE = {
  isDarkTheme: Appearance.getColorScheme() === 'dark',
};

export const SettingsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
