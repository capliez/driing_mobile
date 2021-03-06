import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { AddPackageRoot } from '../../constants/routes';
import ImgNoPackage from '../../images/packages/noPackage';
import ButtonComponent from '../_shared/button';

const NoPackage = ({ navigation }) => {
  return (
    <View style={styles.divMain}>
      <SvgXml
        title={'Aucun colis en attente actuellement !'}
        xml={ImgNoPackage}
        width={195}
        height={250}
      />
      <Text style={styles.text1}>Aucun colis en attente actuellement !</Text>
      <Text style={styles.text2}>
        N’oubliez pas d’ajouter les colis de vos résidents afin de les mettre à
        la liste.
      </Text>
      <ButtonComponent
        onClick={() => navigation.navigate(AddPackageRoot)}
        text={'Ajouter un colis'}
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

export default NoPackage;
