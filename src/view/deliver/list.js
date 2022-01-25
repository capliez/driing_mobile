import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import MainWithName from '../../components/deliver/mainWithName';
import HeaderComponent from '../../components/_shared/headerPage';
import RefreshControlComponent from '../../components/_shared/refreshControl';
import { HomeRoot } from '../../constants/routes';
import { PACKAGES } from '../../constants/packages';
import { marginHorizontal, marginTop } from '../../utils';
import MenuBotom from '../../components/menuBottom';

const DeliverPage = ({ navigation }) => {
  const { t } = useTranslation('deliver');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        scrollEventThrottle={300}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={<RefreshControlComponent />}
      >
        <View style={{ marginTop, marginHorizontal }}>
          <HeaderComponent
            title={'📦 Liste des colis en attente'}
            route={HomeRoot}
            navigation={navigation}
          />

          <MainWithName t={t} packages={PACKAGES} navigation={navigation} />
        </View>
      </ScrollView>
      <MenuBotom navigation={navigation} />
    </SafeAreaView>
  );
};

DeliverPage.propTypes = {
  navigation: PropTypes.object,
};

export default DeliverPage;
