import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderComponent from '../../components/_shared/headerPage';
import AddDeliverWithCode from '../../components/_shared/inputCode';
import RefreshControlComponent from '../../components/_shared/refreshControl';
import { DeliverListRoot } from '../../constants/routes';

const item = {
  id: 1,
  date: new Date(),
  firstName: 'James',
  lastName: 'Bron',
  nbPackage: 2,
  avatar: require('../../../assets/user.png'),
  code: '362J',
};

const CurrentDeliver = ({ navigation }) => {
  const { t } = useTranslation('deliver');
  const [code, setCode] = useState('');
  const [isResult, setIsResult] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const onValidCode = () => {
    if (code === item.code) {
      setIsResult(true);
    } else {
      setIsResult(false);
    }

    setIsSubmit(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
      <ScrollView
        scrollEventThrottle={300}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={<RefreshControlComponent />}
      >
        <HeaderComponent
          title={t('textWaitPackage')}
          route={DeliverListRoot}
          navigation={navigation}
        />

        <View style={styles.divResult}>
          {!item.lastName && (
            <View style={styles.divItemProfile2}>
              <Text style={styles.textNameError}>{t('textUnknownName')}</Text>
            </View>
          )}
          <View style={styles.divTitle}>
            <Text style={styles.textTitle}>{t('textInformation')}</Text>
          </View>
          <View style={styles.divItem}>
            <View style={styles.divItemProfile}>
              <View style={styles.divItemProfile1}>
                <Image
                  accessible
                  accessibilityLabel={`${item.firstName} ${item?.lastName}`}
                  accessibilityRole="image"
                  style={styles.userProfile}
                  defaultSource={require('../../../assets/noUser.jpg')}
                  source={
                    item.avatar
                      ? item.avatar
                      : require('../../../assets/noUser.jpg')
                  }
                />
                <View style={styles.divItemProfile3}>
                  <Text
                    accessible
                    accessibilityLabel={`${item.firstName.toUpperCase()} ${item?.lastName?.toUpperCase()}`}
                    accessibilityRole="text"
                    style={styles.textNameUser}
                  >
                    {item.firstName.toUpperCase()}
                    {item?.lastName?.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.divItem}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderColor: '#F5F5F7',
                  paddingVertical: 10,
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}
              >
                <IconCommunity
                  color={'#7A7A8D'}
                  size={22}
                  name="package-variant-closed"
                />
                <Text
                  accessible
                  accessibilityRole="text"
                  accessibilityLabel={t('textCountPackage')}
                  style={styles.textItemLabel}
                >
                  {t('textCountPackage')} :
                </Text>
                <Text
                  accessible
                  accessibilityRole="text"
                  accessibilityLabel={item.nbPackage}
                  style={styles.textItemValue}
                >
                  {item.nbPackage}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <IconCommunity
                  color={'#7A7A8D'}
                  size={22}
                  name="calendar-refresh-outline"
                />
                <Text
                  accessible
                  accessibilityRole="text"
                  accessibilityLabel={t('textDate')}
                  style={styles.textItemLabel}
                >
                  {t('textDate')} :
                </Text>
                <Moment
                  accessible
                  accessibilityRole="text"
                  style={styles.textItemValue}
                  format="DD.MM.YYYY hh:mm"
                  element={Text}
                >
                  {item.date}
                </Moment>
              </View>
            </View>
          </View>
          {item.code && !isResult && (
            <AddDeliverWithCode
              setCode={setCode}
              setIsSubmit={setIsSubmit}
              code={code}
              isSubmit={isSubmit}
              isResult={isResult}
              onClickFunction={onValidCode}
            />
          )}
          {isResult && (
            <View>
              <Pressable style={styles.buttonDeliver}>
                <Text style={styles.buttonDeliverText}>
                  {t('textDeliverPackage')}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  divResult: {
    marginHorizontal: 15,
  },
  divTitle: {
    marginVertical: 10,
  },
  textTitle: {
    fontSize: 18,
  },
  divItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  divItemProfile3: {
    marginLeft: 15,
  },
  userProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textNameUser: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
  },
  divItemProfile1: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divItemProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textNameError: {
    color: '#E34A5C',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 15,
    paddingLeft: 10,
  },
  divItemProfile2: {
    marginBottom: 10,
    alignItems: 'center',
  },
  textItemLabel: {
    color: '#7A7A8D',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 25,
  },
  textItemValue: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 25,
    marginLeft: 4,
  },
  divItemLabel: {
    marginTop: 20,
    flexDirection: 'row',
  },
  buttonDeliver: {
    backgroundColor: '#222235',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonDeliverText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19,
    textTransform: 'uppercase',
  },
});

CurrentDeliver.propTypes = {
  navigation: PropTypes.object,
};

export default CurrentDeliver;
