import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { getResidents } from '../../redux/residents/actions';
import { useDispatch } from 'react-redux';
import { isNotEmpty, isNotEmptyArray, marginTop } from '../../utils';
const NoResidentLazyComponent = lazy(() => import('../resident/noResident'));

const InputSearchLazyComponent = lazy(() => import('../_shared/inputSearch'));

const ItemLazyComponent = lazy(() => import('./item'));

const ListResidentComponent = ({
  residents,
  t,
  navigation,
  allBuildings,
  loadingResidents,
}) => {
  const [searchTerm, onChangeText] = React.useState('');
  const dispatch = useDispatch();
  const filterList = () => {
    return residents.filter((p) => {
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
        allBuildings={allBuildings}
      />

      {loadingResidents && !isNotEmpty(residents) && (
        <ActivityIndicator style={{ marginTop }} size="large" color="#000000" />
      )}

      {residents && (
        <View style={{ marginVertical: 15, flex: 1 }}>
          {residents && residents.length > 0 ? (
            <FlatList
              data={filterList()}
              onRefresh={() => dispatch(getResidents(allBuildings.id))}
              refreshing={loadingResidents}
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
      )}

      {!isNotEmptyArray(residents) && !loadingResidents && (
        <NoResidentLazyComponent navigation={navigation} />
      )}
    </>
  );
};

ListResidentComponent.propTypes = {
  residents: PropTypes.array,
  t: PropTypes.any,
  navigation: PropTypes.object,
  allBuildings: PropTypes.object,
  loadingResidents: PropTypes.bool,
};

export default ListResidentComponent;
