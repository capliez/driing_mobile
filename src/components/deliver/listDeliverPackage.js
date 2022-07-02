import PropTypes from 'prop-types';
import React, { lazy, useState } from 'react';
import { Text, View, FlatList } from 'react-native';

const NoPackageLazyComponent = lazy(() => import('./noPackage'));

const InputSearchLazyComponent = lazy(() => import('../_shared/inputSearch'));

const ItemPackageLazyComponent = lazy(() => import('./itemPackage'));

const ListDeliverPackageComponent = ({
  packages,
  t,
  navigation,
  loadingPackages,
  idBuilding,
}) => {
  const [searchTerm, onChangeText] = useState('');

  return (
    <>
      <InputSearchLazyComponent
        value={searchTerm}
        onChangeText={onChangeText}
      />

      {packages ? (
        <View style={{ marginVertical: 15, flex: 1 }}>
          {packages && packages.length > 0 ? (
            <FlatList
              contentContainerStyle={{ paddingBottom: 90 }}
              data={packages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={(item) => (
                <ItemPackageLazyComponent
                  navigation={navigation}
                  loadingPackages={loadingPackages}
                  key={item.index}
                  idBuilding={idBuilding}
                  item={item.item}
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

ListDeliverPackageComponent.propTypes = {
  packages: PropTypes.array,
  t: PropTypes.any,
  navigation: PropTypes.object,
  loadingPackages: PropTypes.bool,
};

export default ListDeliverPackageComponent;
