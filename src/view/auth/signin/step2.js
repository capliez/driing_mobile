import React, { lazy, useState } from 'react';
import { marginHorizontal, marginTop } from '../../../utils';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import InputText from '../../../components/_shared/inputText';
import ButtonComponent from '../../../components/_shared/button';

const HeaderLazyComponent = lazy(
  () => import('../../../components/_shared/headerPage'),
);

const Step2SignIn = ({ navigation, changeStep, steps }) => {
  const [fields, setFields] = useState({
    phone: '',
    password: '',
  });

  const onChangeText = (name, text) => {
    setFields({ ...fields, [name]: text });
  };

  const onSubmit = () => {
    console.log(fields);
  };

  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          flex: 1,
          marginHorizontal: marginHorizontal,
          marginTop: marginTop,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <HeaderLazyComponent
            isBack
            functionBack={() =>
              changeStep({ ...steps, step1: true, step2: false })
            }
            navigation={navigation}
          />
          <Text style={styles.text1}>Entrez vos identifiant</Text>
          <InputText
            name="phone"
            onChangeText={onChangeText}
            value={fields.phone}
            maxLength={10}
            keyboardType="phone-pad"
            label={'N° de téléphone'}
          />
          <InputText
            name="password"
            onChangeText={onChangeText}
            value={fields.password}
            secureTextEntry={true}
            label="Mot de passe"
          />
        </View>

        <View>
          <ButtonComponent onClick={onSubmit} text={'Valider'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text1: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 39,
    color: '#000000',
  },
  text2: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
    color: '#B0B6BB',
    marginTop: 10,
  },
});

export default Step2SignIn;
