import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { LogBox } from 'react-native';
import { Text } from 'react-native';

const AppControlFlow = () => {
  //Cacher les warnings
  LogBox.ignoreAllLogs(true);
  return (
    <Provider store={configureStore()}>
      <Suspense fallback={<Text>Je charge</Text>}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Suspense>
    </Provider>
  );
};

export default AppControlFlow;