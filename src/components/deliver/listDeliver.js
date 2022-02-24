import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import { Text, View, Platform, FlatList } from 'react-native';
import { PACKAGES } from '../../constants/packages';

const NoPackageLazyComponent = lazy(
  () => import('../../components/deliver/noPackage'),
);

const InputSearchLazyComponent = lazy(() => import('../_shared/inputSearch'));

const ItemDeliverLazyComponent = lazy(() => import('./item'));

const ListDeliverComponent = ({ dates, t, navigation }) => {
  const [searchTerm, onChangeText] = React.useState('');
  const filterList = () => {
    return dates[0].filter((p) => {
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

      {dates ? (
        <View style={{ marginVertical: 15, flex: 1 }}>
          {dates &&
            Object.entries(dates[0]).map((i) => (
              <ItemDeliverLazyComponent
                navigation={navigation}
                date={i[0]}
                key={i[0]}
                packages={i[1]}
              />
            ))}
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
