import PropTypes from 'prop-types';
import React, { lazy, useEffect } from 'react';
import { Trans } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import MenuBotom from '../../components/menuBottom';
import {
  isNotEmpty,
  isNotEmptyArray,
  marginHorizontal,
  marginTop,
} from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { getPackagesNoHandedOver } from '../../redux/packages/actions';
import { getBuildings } from '../../redux/buildings/actions';

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
const NoResidentLazyComponent = lazy(
  () => import('../../components/resident/noResident'),
);

const HomePage = ({ navigation }) => {
  const [searchTerm, onChangeText] = React.useState('');
  const { nbHandedOver: nbHandedOverPackages, loading: loadingPackage } =
    useSelector((state) => state.packages);
  const { all: allBuildings, loading: loadingBuilding } = useSelector(
    (state) => state.buildings,
  );
  const { allSearch: allResidentSearch, loading: loadingResident } =
    useSelector((state) => state.residents);

  const { currentUser } = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingBuilding && !allBuildings) {
      dispatch(getBuildings());
    }
  }, [allBuildings, dispatch, loadingBuilding]);

  useEffect(() => {
    if (!loadingBuilding && isNotEmpty(allBuildings)) {
      !isNotEmpty(nbHandedOverPackages) &&
        dispatch(getPackagesNoHandedOver(allBuildings.id));
    }
  }, [allBuildings, nbHandedOverPackages, dispatch, loadingBuilding]);

  const renderGridList = () =>
    allResidentSearch.map((p) => (
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
        </View>
        <InputSearchComponent
          isHandedOver={false}
          allBuildings={allBuildings}
          value={searchTerm}
          onChangeText={onChangeText}
        />

        {searchTerm && searchTerm.length > 1 ? (
          <View>
            {!loadingResident &&
              isNotEmptyArray(allResidentSearch) &&
              renderGridList()}
            {!loadingResident && !isNotEmptyArray(allResidentSearch) && (
              <NoResidentLazyComponent
                isSearch={true}
                navigation={navigation}
              />
            )}

            {loadingResident && (
              <ActivityIndicator
                style={{ marginTop }}
                size="large"
                color="#000000"
              />
            )}
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loadingPackage}
                onRefresh={() =>
                  allBuildings
                    ? dispatch(getPackagesNoHandedOver(allBuildings.id))
                    : null
                }
              />
            }
          >
            <BlockAddPackageComponent navigation={navigation} />
            <View style={{ marginTop: 20 }}>
              <Text style={styles.textTitle}>Où en êtes-vous ?</Text>
            </View>
            <BlockDeliverPackageComponent
              navigation={navigation}
              loading={loadingPackage}
              nbPackage={nbHandedOverPackages}
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
