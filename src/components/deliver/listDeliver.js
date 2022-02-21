import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import { Text, View, Platform, FlatList } from 'react-native';
import { PACKAGES } from '../../constants/packages';

const NoPackageLazyComponent = lazy(
  () => import('../../components/deliver/noPackage'),
);

const InputSearchLazyComponent = lazy(() => import('../_shared/inputSearch'));

const ItemDeliverLazyComponent = lazy(() => import('./item'));

const ListDeliverComponent = ({ packages, t, navigation }) => {
  const [searchTerm, onChangeText] = React.useState('');

  const filterList = () => {
    return packages.filter((p) => {
      const fullName = p.lastName
        ? `${p.firstName} ${p.lastName}`
        : p.firstName;

      return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  return (
    <>
      <InputSearchLazyComponent
        value={searchTerm}
        onChangeText={onChangeText}
      />

      {PACKAGES ? (
        <View style={{ marginVertical: 15, flex: 1 }}>
          {packages && packages.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 90 }}
              data={filterList()}
              keyExtractor={(item) => item.id.toString()}
              renderItem={(item) => (
                <ItemDeliverLazyComponent
                  navigation={navigation}
                  key={item.id}
                  item={item}
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