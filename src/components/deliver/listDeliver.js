import PropTypes from 'prop-types';
import React, { lazy, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { getPackages } from '../../redux/packages/actions';

const NoPackageLazyComponent = lazy(
  () => import('../../components/deliver/noPackage'),
);

const InputSearchLazyComponent = lazy(() => import('../_shared/inputSearch'));

const ItemDeliverLazyComponent = lazy(() => import('./item'));

const ListDeliverComponent = ({
  items,
  t,
  loadingPackages,
  idBuilding,
  navigation,
}) => {
  const [searchTerm, onChangeText] = useState('');
  const dispatch = useDispatch();

  return (
    <>
      <InputSearchLazyComponent
        value={searchTerm}
        onChangeText={onChangeText}
      />

      {items ? (
        <View style={{ marginVertical: 15, flex: 1 }}>
          {items && items.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              onRefresh={() => dispatch(getPackages(idBuilding))}
              refreshing={loadingPackages}
              contentContainerStyle={{ paddingBottom: 90 }}
              data={items}
              keyExtractor={(k, item) => item}
              renderItem={(k, item) => (
                <ItemDeliverLazyComponent
                  navigation={navigation}
                  key={item}
                  date={k.item}
                />
              )}
            />
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
        <NoPackageLazyComponent navigation={navigation} />
      )}
    </>
  );
};

ListDeliverComponent.propTypes = {
  packages: PropTypes.array,
  t: PropTypes.any,
  navigation: PropTypes.object,
};

export default ListDeliverComponent;
