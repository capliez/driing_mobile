import PropTypes from 'prop-types';
import React, { lazy, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import ItemDeliver from '../../components/deliver/item';
import MenuBotom from '../../components/menuBottom';
import { PACKAGES } from '../../constants/packages';
import { marginHorizontal, marginTop } from '../../utils';

const RefreshControlComponent = lazy(
  () => import('../../components/_shared/refreshControl'),
);

const InputSearchComponent = lazy(
  () => import('../../components/_shared/inputSearch'),
);

const BlockAddPackageComponent = lazy(
  () => import('../../components/_shared/block/addPackage'),
);

const BlockContactComponent = lazy(
  () => import('../../components/_shared/block/contact'),
);

const BlockDeliverPackageComponent = lazy(
  () => import('../../components/_shared/block/deliverPackage'),
);

const OnBoardingComponent = lazy(() => import('../../components/onboarding'));

const HomePage = ({ navigation }) => {
  const [showRealApp, setShowRealApp] = useState(true);
  const [searchTerm, onChangeText] = React.useState('');
  const [nbPackage, setNbPackage] = React.useState(12);
  const { t } = useTranslation(['deliver', 'translations']);

  const onRefreshControl = () => {
    setNbPackage(nbPackage + 1);
  };

  const filterList = () => {
    return PACKAGES.filter((p) => {
      const fullName = p.lastName
        ? `${p.firstName} ${p.lastName}`
        : p.firstName;

      return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };
  const renderGridList = () =>
    filterList().map((p) => (
      <ItemDeliver navigation={navigation} key={p.id} item={p} />
    ));

  if (!showRealApp) {
    return (
      <OnBoardingComponent
        showRealApp={showRealApp}
        setShowRealApp={setShowRealApp}
      />
    );
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <ScrollView
          scrollEventThrottle={300}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControlComponent onRefreshControl={onRefreshControl} />
          }
        >
          <View style={{ marginTop, marginHorizontal }}>
            <View>
              <View>
                <Trans
                  i18nKey="userWelcome"
                  defaults="<1>Bonjour {{name}}</1>"
                  values={{ name: 'Claude' }}
                  components={{
                    1: (
                      <Text
                        accessible
                        accessibilityRole="text"
                        style={styles.textWelcome}
                      />
                    ),
                  }}
                />
              </View>
              <InputSearchComponent
                value={searchTerm}
                onChangeText={onChangeText}
              />
              {searchTerm ? (
                <View style={styles.divList}>
                  {PACKAGES ? (
                    renderGridList()
                  ) : (
                    <Text
                      accessible
                      accessibilityRole="text"
                      accessibilityLabel={t('textNoPackagesPending')}
                    >
                      {t('textNoPackagesPending')}
                    </Text>
                  )}
                </View>
              ) : (
                <>
                  <BlockAddPackageComponent navigation={navigation} />
                  <View style={{ marginTop: 20 }}>
                    <Text style={styles.textTitle}>Où en êtes-vous ?</Text>
                  </View>
                  <BlockDeliverPackageComponent navigation={navigation} />
                  <View style={{ marginTop: 20 }}>
                    <Text style={styles.textTitle}>
                      Besoin de contacter votre syndic ?
                    </Text>
                  </View>
                  <BlockContactComponent navigation={navigation} />
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <MenuBotom navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  textWelcome: {
    fontSize: 18,
    color: '#222235',
    fontWeight: '600',
    lineHeight: 22,
  },
  textTitle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: '#131314',
  },
});

HomePage.propTypes = {
  navigation: PropTypes.object,
};

export default HomePage;
