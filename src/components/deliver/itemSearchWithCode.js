import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'react-moment';

const ItemSearchWithCode = ({ item, t }) => {
  return (
    <>
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
                {item.firstName.toUpperCase()} {item?.lastName?.toUpperCase()}
              </Text>
            </View>
          </View>
          {!item.lastName && (
            <View style={styles.divItemProfile2}>
              <Text style={styles.textNameError}>{t('textUnknownName')}</Text>
            </View>
          )}
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
      <View>
        <Pressable style={styles.buttonDeliver}>
          <Text style={styles.buttonDeliverText}>
            {t('textDeliverPackage')}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

ItemSearchWithCode.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  nbResult: PropTypes.number,
  t: PropTypes.any,
};

const styles = StyleSheet.create({
  divTitle: {
    marginBottom: 10,
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
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 15,
  },
  divItemProfile2: {
    backgroundColor: '#E34A5C',
    padding: 6,
    borderRadius: 6,
  },
  textItemLabel: {
    color: '#7A7A8D',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 25,
    marginLeft: 8,
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

export default ItemSearchWithCode;
