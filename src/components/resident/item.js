import PropTypes from 'prop-types';
import React from 'react';
import Moment from 'react-moment';
import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { DeliverCurrentRoot } from '../../constants/routes';
import { useTranslation } from 'react-i18next';

const ItemOneRow = ({ item, navigation, onClick }) => {
  const { t } = useTranslation('deliver');

  return (
    <View accessible accessibilityRole="tab" style={styles.divItem}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.divItemProfile}>
          <Image
            accessible
            accessibilityRole="image"
            accessibilityLabel={`${item.firstName} ${item?.lastName}`}
            loadingIndicatorSource={require('../../../assets/noUser.jpg')}
            style={styles.userProfile}
            source={
              item.avatar ? item.avatar : require('../../../assets/noUser.jpg')
            }
          />
        </View>
        <View style={styles.divItemLabel}>
          <View style={{ marginBottom: 5 }}>
            <Text
              accessible
              accessibilityRole="text"
              accessibilityLabel={`${item.firstName} ${item?.lastName}`}
              style={styles.textNameUser}
            >
              {item.firstName.toUpperCase()} {item?.lastName?.toUpperCase()}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              accessible
              accessibilityRole="text"
              accessibilityLabel={t('textCountPackage')}
              style={styles.textItemLabel}
            >
              📬 {t('textCountPackage')} :
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
            }}
          >
            <Text
              accessible
              accessibilityRole="text"
              accessibilityLabel={t('textDate')}
              style={styles.textItemLabel}
            >
              ⏰ {t('textDate')} :
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
      <View style={styles.divLast}>
        {(navigation || onClick) && (
          <Pressable
            onPress={() =>
              navigation
                ? navigation?.navigate(DeliverCurrentRoot)
                : onClick(item)
            }
          >
            <IconIonicons
              color={'#131314'}
              size={28}
              name="chevron-forward-outline"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  divItem: {
    backgroundColor: '#F5F5F7',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textNameUser: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
  },
  divItemProfile: {
    alignItems: 'center',
  },
  textItemLabel: {
    color: '#131314',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
  },
  textItemValue: {
    fontWeight: 'normal',
    color: '#131314',
    fontSize: 14,
    lineHeight: 25,
    marginLeft: 4,
  },
  divItemLabel: {
    marginLeft: 20,
  },
  divLast: {
    justifyContent: 'center',
  },
});

ItemOneRow.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
  onClick: PropTypes.func,
};

export default ItemOneRow;
