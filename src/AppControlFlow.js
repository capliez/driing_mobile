import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { LogBox } from 'react-native';
import { Text } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

const AppControlFlow = () => {
  //Cacher les warnings
  //LogBox.ignoreAllLogs(true);
  return (
    <RootSiblingParent>
      <Provider store={configureStore()}>
        <Suspense fallback={<></>}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </Suspense>
      </Provider>
    </RootSiblingParent>
  );
};

export default AppControlFlow;
