import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import StripedTopImg from '../../../images/stripedTop';
import StripedBottomImg from '../../../images/stripedBottom';
import LogoWhiteDriing from '../../../images/logoWhite';
import ButtonComponent from '../../../components/_shared/button';

const Step1BlackSignIn = ({ changeStep, steps }) => {
  return (
    <SafeAreaView style={styles.main}>
      <View>
        <SvgXml
          title={'Trait Driing'}
          xml={StripedTopImg}
          width={132}
          height={119}
        />
      </View>
      <View style={styles.divCenter}>
        <SvgXml
          title={'Logo Driing'}
          xml={LogoWhiteDriing}
          width={159}
          height={54}
        />
        <Text style={styles.text}>
          Soyez accompagné pour mieux gérer votre immeuble
        </Text>
      </View>

      <View>
        <View style={styles.divBeforeBottom}>
          <SvgXml
            title={'Trait Driing'}
            xml={StripedBottomImg}
            width={109}
            height={243}
          />
        </View>
        <View style={styles.divBottom}>
          <ButtonComponent
            onClick={() => changeStep({ ...steps, step1: false, step2: true })}
            text={'Commencer'}
            classBtn={styles.btn}
            classText={styles.btnText}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  divCenter: {
    marginHorizontal: 25,
  },
  divBeforeBottom: {
    alignItems: 'flex-end',
  },
  divBottom: {
    marginHorizontal: 25,
    marginBottom: 10,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  btnText: {
    color: '#131314',
  },
  text: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 29,
    color: '#FFFFFF',
  },
});

export default Step1BlackSignIn;
