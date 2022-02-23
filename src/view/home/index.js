import PropTypes from 'prop-types';
import React, { lazy, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import MenuBotom from '../../components/menuBottom';
import { PACKAGES } from '../../constants/packages';
import { isNotEmpty, marginHorizontal, marginTop } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { getPackages } from '../../redux/packages/actions';
import { logoutUser } from '../../redux/auth/actions';
import { useEffect } from 'react';
import { SignInRoot } from '../../constants/routes';
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

const ItemResidentLazyComponent = lazy(
  () => import('../../components/resident/item'),
);

const HomePage = ({ navigation }) => {
  const [searchTerm, onChangeText] = React.useState('');
  const { t } = useTranslation(['deliver', 'translations']);
  const { all: allPackages, loading: loadingPackage } = useSelector(
    (state) => state.packages,
  );
  const { all: allBuildings } = useSelector((state) => state.buildings);
  const { currentUser } = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    isNotEmpty(allBuildings) && dispatch(getPackages(allBuildings.id));
  }, [allBuildings, dispatch]);

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
      <ItemResidentLazyComponent navigation={navigation} key={p.id} item={p} />
    ));

  if (!currentUser.isOnboarding) {
    return <OnBoardingComponent user={currentUser} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ marginVertical: marginTop, marginHorizontal, flex: 1 }}>
        <View>
          <Trans
            i18nKey="userWelcome"
            defaults="<1>Bonjour {{name}}</1>"
            values={{ name: currentUser.firstName }}
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
          <Button
            onPress={() => {
              dispatch(logoutUser());
            }}
            title="deconnexion"
          />
        </View>
        <InputSearchComponent value={searchTerm} onChangeText={onChangeText} />
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
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <BlockAddPackageComponent navigation={navigation} />
            <View style={{ marginTop: 20 }}>
              <Text style={styles.textTitle}>Où en êtes-vous ?</Text>
            </View>
            <BlockDeliverPackageComponent
              navigation={navigation}
              loading={loadingPackage}
              nbPackage={allPackages && allPackages.length}
            />
            <View style={{ marginTop: 20 }}>
              <Text style={styles.textTitle}>
                Besoin de contacter votre syndic ?
              </Text>
            </View>
            <BlockContactComponent navigation={navigation} />
          </ScrollView>
        )}
      </View>

      <MenuBotom navigation={navigation} />
    </SafeAreaView>
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
