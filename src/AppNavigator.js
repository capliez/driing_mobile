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
import ToastRedux from './toastRedux';
import LoadingScreen from './components/loadingScreen';
const Stack = createStackNavigator();

const HomeScreen = lazy(() => import('./view/home'));
const ListDeliverScreen = lazy(() => import('./view/deliver/list'));
const CurrentDeliverScreen = lazy(() => import('./view/deliver/current'));
const AddPackageScreen = lazy(() => import('./view/addPackage'));
const ListResidentScreen = lazy(() => import('./view/resident/list'));
const SignInScreen = lazy(() => import('./view/auth/signin'));

export default () => {
  const { currentUser, loadingCookie: loadingCookie } = useSelector(
    (state) => state.authUser,
  );

  //Si cookie authentification
  if (loadingCookie) {
    return <LoadingScreen />;
  }

  return (
    <>
      <StatusBar
        animated
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <ToastRedux />
      <Stack.Navigator screenOptions={{ headerBackTitle: '', title: '' }}>
        {currentUser ? (
          <Fragment>
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
          </Fragment>
        ) : (
          <Stack.Screen
            name={SignInRoot}
            component={SignInScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </>
  );
};
