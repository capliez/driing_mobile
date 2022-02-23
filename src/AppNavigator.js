import React, { Fragment, lazy } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeRoot,
  DeliverCurrentRoot,
  DeliverListRoot,
  AddPackageRoot,
  ResidentListRoot,
  SignInRoot,
} from './constants/routes';
import { useSelector } from 'react-redux';
import ToastGeneral from './toastGeneral';
import LoadingScreen from './components/loadingScreen';

const Stack = createStackNavigator();
const StackLogin = createStackNavigator();

const HomeScreen = lazy(() => import('./view/home'));
const ListDeliverScreen = lazy(() => import('./view/deliver/list'));
const CurrentDeliverScreen = lazy(() => import('./view/deliver/current'));
const AddPackageScreen = lazy(() => import('./view/addPackage'));
const ListResidentScreen = lazy(() => import('./view/resident/list'));
const SignInScreen = lazy(() => import('./view/auth/signin'));

export default () => {
  const {
    currentUser,
    loadingCookie: loadingCookie,
    loadingLogout,
  } = useSelector((state) => state.authUser);

  //Si cookie authentification
  if (loadingCookie) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ToastGeneral />
      <StatusBar
        animated
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      {!loadingLogout && currentUser !== null ? (
        <Stack.Navigator screenOptions={{ headerBackTitle: '', title: '' }}>
          <Stack.Screen
            name={HomeRoot}
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={DeliverListRoot}
            component={ListDeliverScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={DeliverCurrentRoot}
            component={CurrentDeliverScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={AddPackageRoot}
            component={AddPackageScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ResidentListRoot}
            component={ListResidentScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <StackLogin.Navigator
          screenOptions={{ headerBackTitle: '', title: '' }}
        >
          <StackLogin.Screen
            name={SignInRoot}
            component={SignInScreen}
            options={{
              headerShown: false,
            }}
          />
        </StackLogin.Navigator>
      )}
    </>
  );
};
