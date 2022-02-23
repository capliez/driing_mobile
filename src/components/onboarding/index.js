import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SvgXml } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../../images/onboarding/logo';
import step1 from '../../images/onboarding/step1';
import step2 from '../../images/onboarding/step2';
import step3 from '../../images/onboarding/step3';
import { updateUser } from '../../redux/auth/actions';
import { useDispatch } from 'react-redux';

const OnBoarding = ({ user }) => {
  const { t } = useTranslation(['onBoarding, button']);
  const dispatch = useDispatch();

  const slides = [
    {
      key: '1',
      title: t('onBoarding:titleGuardian1'),
      text: t('onBoarding:descriptionGuardian1'),
      image: step1,
    },
    {
      key: '2',
      title: t('onBoarding:titleGuardian2'),
      text: t('onBoarding:descriptionGuardian2'),
      image: step2,
    },
    {
      key: '3',
      title: t('onBoarding:titleGuardian3'),
      text: t('onBoarding:descriptionGuardian3'),
      image: step3,
    },
  ];

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slideOwner}>
        <View
          style={{
            marginTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight,
          }}
        >
          <View>
            <SvgXml xml={logo} />
          </View>
          <View style={styles.slideChild1}>
            <SvgXml style={styles.image} xml={item.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      </View>
    );
  };
  const _renderNextButton = () => {
    return (
      <View style={styles.buttonNext}>
        <Text style={{ color: 'white' }}>{t('button:next')}</Text>
        <Icon
          name="arrow-right-alt"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  const _renderPrevButton = () => {
    return (
      <View style={styles.buttonPrev}>
        <Text style={{ color: '#222235', fontWeight: 'bold' }}>
          {t('button:previous')}
        </Text>
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonNext}>
        <Text style={{ color: 'white' }}>{t('button:letsGo')}</Text>

        <Icon
          name="arrow-right-alt"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  const _onDone = () => {
    dispatch(
      updateUser({ isOnboarding: true, lang: user.language.id }, user.id),
    );
  };

  const _keyExtractor = (item) => item.title;

  return (
    <>
      <AppIntroSlider
        data={slides}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        onDone={_onDone}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        renderPrevButton={_renderPrevButton}
        showPrevButton
        dotStyle={{ bottom: 80, backgroundColor: 'rgba(34, 34, 53, 0.1)' }}
        activeDotStyle={{ backgroundColor: '#222235', bottom: 80 }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonNext: {
    backgroundColor: '#222235',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonPrev: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  slideOwner: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  slideChild1: {
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    marginVertical: 32,
  },
  text: {
    color: '#C3C3C9',
    textAlign: 'center',
    marginHorizontal: 30,
  },
  title: {
    fontSize: 22,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
  },
});

export default OnBoarding;
