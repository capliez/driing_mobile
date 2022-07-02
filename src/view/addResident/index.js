import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { ResidentListRoot, AddResidentStep1Root } from '../../constants/routes';
import { SvgXml } from 'react-native-svg';
import infoIMG from '../../images/addresident/info';
import ButtonComponent from '../../components/_shared/button';

const HeaderLazyComponent = lazy(
  () => import('../../components/_shared/headerPage'),
);

const AddResidentPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ margin: 15 }}>
        <HeaderLazyComponent
          title={'Ajouter un habitant'}
          route={ResidentListRoot}
          isBack={true}
          navigation={navigation}
        />
        <View style={{ display: 'flex', alignItems: 'center', marginTop: 50 }}>
          <SvgXml
            title={'Aucun résident en attente'}
            xml={infoIMG}
            width={262}
            height={231}
          />
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus et
            ut morbi at.
          </Text>
          <ButtonComponent
            classBtn={{ width: '100%' }}
            onClick={() => navigation.navigate(AddResidentStep1Root)}
            text="Ajouter un nouvel habitant"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#ACB2B7',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 45,
    marginBottom: 20,
  },
});

AddResidentPage.propTypes = {
  navigation: PropTypes.any,
};

export default AddResidentPage;
