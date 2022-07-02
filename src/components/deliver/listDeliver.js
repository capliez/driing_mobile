import PropTypes from 'prop-types';
import React, { lazy, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { getPackages } from '../../redux/packages/actions';
import { isNotEmpty, isNotEmptyArray, marginTop } from '../../utils';
const NoPackageLazyComponent = lazy(
  () => import('../../components/deliver/noPackage'),
);

const InputSearchLazyComponent = lazy(() => import('../_shared/inputSearch'));

const ItemDeliverLazyComponent = lazy(() => import('./item'));

const NoResidentLazyComponent = lazy(
  () => import('../../components/resident/noResident'),
);

const ItemResidentLazyComponent = lazy(
  () => import('../../components/resident/item'),
);

const ListDeliverComponent = ({
  items,
  loadingPackages,
  allBuildings,
  navigation,
  loadingResident,
  allResidentSearch,
}) => {
  const [searchTerm, onChangeText] = useState('');
  const dispatch = useDispatch();

  const renderGridList = () =>
    allResidentSearch.map((p) => (
      <ItemResidentLazyComponent navigation={navigation} key={p.id} item={p} />
    ));

  return (
    <>
      <InputSearchLazyComponent
        value={searchTerm}
        onChangeText={onChangeText}
        allBuildings={allBuildings}
      />

      {loadingPackages && !isNotEmpty(items) && (
        <ActivityIndicator style={{ marginTop }} size="large" color="#000000" />
      )}

      {isNotEmpty(searchTerm) && (
        <View>
          {!loadingResident &&
            isNotEmptyArray(allResidentSearch) &&
            renderGridList()}
          {!loadingResident && !isNotEmptyArray(allResidentSearch) && (
            <NoResidentLazyComponent isSearch={true} navigation={navigation} />
          )}

          {loadingResident && (
            <ActivityIndicator
              style={{ marginTop }}
              size="large"
              color="#000000"
            />
          )}
        </View>
      )}

      {!isNotEmpty(searchTerm) && isNotEmptyArray(items) && !loadingPackages && (
        <View style={{ marginVertical: 15, flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            onRefresh={() => dispatch(getPackages(allBuildings.id))}
            refreshing={loadingPackages}
            contentContainerStyle={{ paddingBottom: 90 }}
            data={items}
            keyExtractor={(k, item) => item}
            renderItem={(k, item) => (
              <ItemDeliverLazyComponent
                navigation={navigation}
                idBuilding={allBuildings.id}
                key={item}
                date={k.item}
              />
            )}
          />
        </View>
      )}

      {!isNotEmptyArray(items) && !loadingPackages && (
        <NoPackageLazyComponent navigation={navigation} />
      )}
    </>
  );
};

ListDeliverComponent.propTypes = {
  packages: PropTypes.array,
  navigation: PropTypes.object,
  items: PropTypes.array,
  loadingPackages: PropTypes.bool,
  allBuildings: PropTypes.object,
  loadingResident: PropTypes.bool,
  allResidentSearch: PropTypes.array,
};

export default ListDeliverComponent;
