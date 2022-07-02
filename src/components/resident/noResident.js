import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { AddPackageRoot } from '../../constants/routes';
import ImgNoPackage from '../../images/packages/noPackage';
import ButtonComponent from '../_shared/button';
import PropTypes from 'prop-types';

const NoPackage = ({ navigation, isSearch }) => {
  return (
    <View style={styles.divMain}>
      <SvgXml
        title={'Aucun résident en attente'}
        xml={ImgNoPackage}
        width={195}
        height={250}
      />
      <Text style={styles.text1}>
        {isSearch
          ? 'Aucun résident de ce nom !'
          : 'Aucun résident actuellement !'}
      </Text>
      <Text style={styles.text2}>
        N’oubliez pas d’ajouter des résidents afin de les mettre à la liste.
      </Text>
      <ButtonComponent
        onClick={() => navigation.navigate(AddPackageRoot)}
        text={'Ajouter un résident'}
        classBtn={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  divMain: {
    alignItems: 'center',
    marginTop: 40,
  },
  text1: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    color: '#131314',
    marginTop: 30,
    marginBottom: 15,
  },
  text2: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#ACB2B7',
    marginBottom: 10,
  },
});

NoPackage.propTypes = {
  navigation: PropTypes.any,
  isSearch: PropTypes.bool,
};

export default NoPackage;
