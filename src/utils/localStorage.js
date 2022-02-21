import { setItemAsync, getItemAsync, deleteItemAsync } from 'expo-secure-store';

const MSG_ERROR = 'LocalStorage : An error has occurred';

const getItem = async (name, functionError) => {
  try {
    return await getItemAsync(name);
  } catch (e) {
    functionError(MSG_ERROR);
  }
};

const setItem = async (name, value, functionError) => {
  try {
    return await setItemAsync(name, value);
  } catch (e) {
    functionError(MSG_ERROR);
  }
};

const removeItem = async (name, functionError) => {
  try {
    return await deleteItemAsync(name);
  } catch (e) {
    functionError(MSG_ERROR);
  }
};

export const STORAGE = {
  getItem,
  setItem,
  removeItem,
};
