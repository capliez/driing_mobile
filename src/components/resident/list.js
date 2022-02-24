import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import { Text, View, FlatList } from 'react-native';
import { getResidents } from '../../redux/residents/actions';
import { useDispatch } from 'react-redux';

const NoResidentLazyComponent = lazy(() => import('../resident/noResident'));

const InputSearchLazyComponent = lazy(() => import('../_shared/inputSearch'));

const ItemLazyComponent = lazy(() => import('./item'));

const ListResidentComponent = ({
  residents,
  t,
  navigation,
  idBuilding,
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
      />

      {residents ? (
        <View style={{ marginVertical: 15, flex: 1 }}>
          {residents && residents.length > 0 ? (
            <FlatList
              data={filterList()}
              onRefresh={() => dispatch(getResidents(idBuilding))}
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
      ) : (
        <NoResidentLazyComponent navigation={navigation} />
      )}
    </>
  );
};

ListResidentComponent.propTypes = {
  residents: PropTypes.array,
  t: PropTypes.any,
  navigation: PropTypes.object,
  idBuilding: PropTypes.number,
  loadingResidents: PropTypes.bool,
};

export default ListResidentComponent;
