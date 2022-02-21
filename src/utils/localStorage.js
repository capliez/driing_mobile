import AsyncStorage from '@react-native-async-storage/async-storage';

const MSG_ERROR = 'LocalStorage : An error has occurred';

const getItem = async (name, functionError) => {
  try {
    return await AsyncStorage.getItem(name);
  } catch (e) {
    functionError(MSG_ERROR);
  }
};

const setItem = async (name, value, functionError) => {
  try {
    return await AsyncStorage.setItem(name, value);
  } catch (e) {
    functionError(MSG_ERROR);
  }
};

const removeItem = async (name, functionError) => {
  try {
    return await AsyncStorage.removeItem(name);
  } catch (e) {
    functionError(MSG_ERROR);
  }
};

export const STORAGE = {
  getItem,
  setItem,
  removeItem,
};
