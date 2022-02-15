import PropTypes from 'prop-types';
import React, { Fragment, lazy } from 'react';
import { Text, View, FlatList } from 'react-native';
import { PACKAGES } from '../../constants/packages';

const NoPackageLazyComponent = lazy(() => import('../deliver/noPackage'));

const InputSearchLazyComponent = lazy(() => import('../_shared/inputSearch'));

const ItemLazyComponent = lazy(() => import('./item'));

const ListResidentComponent = ({ packages, t, navigation }) => {
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
              data={filterList()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 90 }}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ItemLazyComponent
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

ListResidentComponent.propTypes = {
  packages: PropTypes.array,
  t: PropTypes.any,
  navigation: PropTypes.object,
};

export default ListResidentComponent;
