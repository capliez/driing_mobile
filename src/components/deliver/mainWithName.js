import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ItemDeliver from './item';
import InputSearchComponent from '../_shared/inputSearch';
import NoPackageComponent from '../../components/deliver/noPackage';
import { PACKAGES } from '../../constants/packages';

const MainWithName = ({ packages, t, navigation }) => {
  const [searchTerm, onChangeText] = React.useState('');

  const filterList = () => {
    return packages.filter((p) => {
      const fullName = p.lastName
        ? `${p.firstName} ${p.lastName}`
        : p.firstName;

      return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const renderGridList = () =>
    filterList().map((p) => (
      <ItemDeliver navigation={navigation} key={p.id} item={p} />
    ));

  return (
    <>
      <InputSearchComponent value={searchTerm} onChangeText={onChangeText} />

      {PACKAGES ? (
        <View style={{ marginTop: 15 }}>
          {packages && packages.length > 0 ? (
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
        <NoPackageComponent navigation={navigation} />
      )}
    </>
  );
};

MainWithName.propTypes = {
  packages: PropTypes.array,
  t: PropTypes.any,
  navigation: PropTypes.object,
};

export default MainWithName;
