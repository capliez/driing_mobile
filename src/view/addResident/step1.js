import React, { lazy, useState } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet, View, Text, TextInput } from 'react-native';
import { ResidentListRoot, AddResidentRoot } from '../../constants/routes';
import ButtonComponent from '../../components/_shared/button';
import { registerResident } from '../../redux/residents/actions';
import { useSelector, useDispatch } from 'react-redux';
import { isNotEmpty } from '../../utils';

const HeaderLazyComponent = lazy(
  () => import('../../components/_shared/headerPage'),
);

const Step1 = ({ navigation }) => {
  const dispatch = useDispatch();
  const [errorField, setErrorField] = useState(false);
  const [fields, setFields] = useState({
    lastName: '',
    phone: '',
  });

  const { all: allBuildings } = useSelector((state) => state.buildings);
  const { all: allResidents, loading: loadingResident } = useSelector(
    (state) => state.residents,
  );

  const onChangeField = (lastName, value) => {
    setFields({ ...fields, [lastName]: value });
  };

  const verifName = () => {
    if (allResidents.length > 0) {
      const result = allResidents.findIndex(
        (item) =>
          item.lastName.toUpperCase() == fields.lastName.trim().toUpperCase(),
      );

      return result == -1 ? false : true;
    }

    return false;
  };

  const verifPhone = () => {
    if (allResidents.length > 0) {
      const result = allResidents.findIndex(
        (item) => item.phone == fields.phone,
      );

      return result == -1 ? false : true;
    }

    return false;
  };

  const submitResident = () => {
    if (!isNotEmpty(fields.lastName) && !isNotEmpty(fields.phone))
      setErrorField(true);
    else {
      setErrorField(false);
      if (!verifPhone() && !verifName()) {
        dispatch(registerResident({ ...fields, building: allBuildings.id }));
        navigation.navigate(ResidentListRoot);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ margin: 15 }}>
        <HeaderLazyComponent
          title={'Ajouter un habitant'}
          route={AddResidentRoot}
          isBack={true}
          navigation={navigation}
        />
        <View
          style={{
            display: 'flex',
          }}
        >
          <View>
            {errorField && (
              <View
                style={{
                  backgroundColor: '#E34A5C',
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ fontSize: 15, color: 'white', fontWeight: '600' }}
                >
                  Merci de remplir tous les champs
                </Text>
              </View>
            )}

            <Text style={styles.label}>Indiquez le nom du nouvel habitant</Text>
            <TextInput
              clearButtonMode="always"
              style={styles.input}
              onChangeText={(e) => onChangeField('lastName', e)}
              placeholderTextColor={'#B0B6BB'}
              placeholder={'Entrer le nom ici'}
              value={fields.lastName}
            />
            {verifName() && (
              <View
                style={{
                  marginTop: 10,
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ fontSize: 15, color: '#E34A5C', fontWeight: '600' }}
                >
                  Ce nom existe déjà
                </Text>
              </View>
            )}
            <Text style={styles.label}>Indiquez son numéro de téléphone</Text>
            <TextInput
              clearButtonMode="always"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={(e) => onChangeField('phone', e)}
              placeholderTextColor={'#B0B6BB'}
              placeholder={'Entrer le numéro de téléphone ici'}
              value={fields.phone}
            />
            {verifPhone() && (
              <View
                style={{
                  marginTop: 10,
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ fontSize: 15, color: '#E34A5C', fontWeight: '600' }}
                >
                  Ce numéro de téléphone existe déjà
                </Text>
              </View>
            )}
          </View>
          <ButtonComponent
            isDisabled={loadingResident}
            classBtn={{ width: '100%' }}
            onClick={() => submitResident()}
            text="Ajouter un habitant"
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
  label: {
    marginTop: 25,
    fontSize: 16,
    color: '#131314',
    lineHeight: 21,
    fontWeight: '600',
  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#D0D0DB',
    borderRadius: 6,
    marginTop: 10,
    width: '100%',
  },
});

Step1.propTypes = {
  navigation: PropTypes.any,
};

export default Step1;
