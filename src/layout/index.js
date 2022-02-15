import React, { lazy } from 'react';
import { SafeAreaView, View } from 'react-native';
import { marginHorizontal, marginTop } from '../utils';
import PropTypes from 'prop-types';

const MenuBotomLazyComponent = lazy(() => import('../components/menuBottom'));

const LayoutDefault = ({ navigation, children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ marginTop, marginHorizontal, flex: 1 }}>{children}</View>
      <MenuBotomLazyComponent navigation={navigation} />
    </SafeAreaView>
  );
};

LayoutDefault.propTypes = {
  navigation: PropTypes.object,
  children: PropTypes.node,
};

export default LayoutDefault;
