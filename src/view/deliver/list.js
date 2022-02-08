import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, View } from 'react-native';
import RefreshControlComponent from '../../components/_shared/refreshControl';
import { PACKAGES } from '../../constants/packages';
import { HomeRoot } from '../../constants/routes';
import { marginHorizontal, marginTop } from '../../utils';

const HeaderLazyComponent = lazy(
  () => import('../../components/_shared/headerPage'),
);

const ListDeliverLazyComponent = lazy(
  () => import('../../components/deliver/listDeliver'),
);

const MenuBotomLazyComponent = lazy(
  () => import('../../components/menuBottom'),
);

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
          <HeaderLazyComponent
            title={'📦 Liste des colis en attente'}
            route={HomeRoot}
            navigation={navigation}
          />

          <ListDeliverLazyComponent
            t={t}
            packages={PACKAGES}
            navigation={navigation}
          />
        </View>
      </ScrollView>
      <MenuBotomLazyComponent navigation={navigation} />
    </SafeAreaView>
  );
};

DeliverPage.propTypes = {
  navigation: PropTypes.object,
};

export default DeliverPage;
