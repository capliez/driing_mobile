import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Step1SignInImg from '../../../images/signin/step1';
import LogoDriingImg from '../../../images/onboarding/logo';
import { SvgXml } from 'react-native-svg';
import ButtonComponent from '../../../components/_shared/button';
import { marginHorizontal, marginTop } from '../../../utils';

const Step1Singin = ({ changeStep, steps }) => {
  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{ marginHorizontal: marginHorizontal, marginTop: marginTop }}
      >
        <SvgXml
          title={'Logo Driing'}
          xml={LogoDriingImg}
          width={71}
          height={26}
        />
      </View>
      <View style={{ marginHorizontal: 15 }}>
        <SvgXml
          title={'Image Driing'}
          xml={Step1SignInImg}
          width={396}
          height={197}
        />
        <Text style={styles.text1}>
          Soyez accompagné pour mieux gérer votre immeuble
        </Text>
        <Text style={styles.text2}>
          Vos tâches n’ont jamais été aussi simple
        </Text>
      </View>
      <View style={{ marginHorizontal: 15 }}>
        <ButtonComponent
          onClick={() => changeStep({ ...steps, step1: false, step2: true })}
          text={'Commencer'}
          classBtn={styles.btn}
          classText={styles.btnText}
        />
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

export default Step1Singin;
