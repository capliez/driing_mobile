import PropTypes from 'prop-types';
import React from 'react';
import Moment from 'react-moment';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { DeliverCurrentRoot } from '../../constants/routes';
import { useTranslation } from 'react-i18next';
import UserAvatar from 'react-native-user-avatar';
import { getResidentCurrrent } from '../../redux/residents/actions';
import { useDispatch } from 'react-redux';
import CurrentDeliver from '../../view/deliver/current';
const ItemResident = ({ item, navigation, noDetails, onClick, isCurrent }) => {
  const { t } = useTranslation('deliver');
  const dispatch = useDispatch();

  const viewResident = () => {
    dispatch(getResidentCurrrent(item.id));
    navigation?.navigate(DeliverCurrentRoot);
  };

  return (
    <Pressable onPress={() => (navigation ? viewResident() : onClick(item))}>
      <View accessible accessibilityRole="tab" style={styles.divItem}>
        <View style={{ flexDirection: 'row' }}>
          {!noDetails && (
            <View style={styles.divItemProfile}>
              <UserAvatar
                size={isCurrent ? 40 : 30}
                style={[
                  styles.userProfile,
                  isCurrent && { width: 50, height: 50, borderRadius: 50 },
                ]}
                name={item.lastName}
              />
            </View>
          )}

          <View style={styles.divItemLabel}>
            <View
              style={{
                marginBottom: 5,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {!noDetails && (
                <Text
                  accessible
                  accessibilityRole="text"
                  accessibilityLabel={item.lastName}
                  style={styles.textNameUser}
                >
                  {item.lastName.toUpperCase()}
                </Text>
              )}

              {item.packageHandedOver && !isCurrent && !noDetails && (
                <View
                  style={{
                    marginLeft: 10,
                    backgroundColor: '#F2EEE3',
                    padding: 5,
                    borderRadius: 6,
                  }}
                >
                  <Text>Colis en attente</Text>
                </View>
              )}
            </View>
            {isCurrent ? (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    accessible
                    accessibilityRole="text"
                    accessibilityLabel={t('textCountPackage')}
                    style={styles.textItemLabel}
                  >
                    🏠 Résidence :
                  </Text>
                  <Text
                    accessible
                    accessibilityRole="text"
                    accessibilityLabel={item.nbPackage}
                    style={styles.textItemValue}
                  >
                    n°21 porte A
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 3,
                  }}
                >
                  <Text
                    accessible
                    accessibilityRole="text"
                    accessibilityLabel={t('textDate')}
                    style={styles.textItemLabel}
                  >
                    📞 Téléphone :
                  </Text>
                  <Text
                    accessible
                    accessibilityRole="text"
                    accessibilityLabel={item.nbPackage}
                    style={styles.textItemValue}
                  >
                    {item.phone}
                  </Text>
                </View>
              </>
            ) : (
              <>
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
                    {item.countPackages}
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
                    {item.createdAt}
                  </Moment>
                </View>
              </>
            )}
          </View>
        </View>
        {!isCurrent && (
          <View style={styles.divLast}>
            {(navigation || onClick) && (
              <Pressable
                onPress={() => (navigation ? viewResident() : onClick(item))}
              >
                <IconIonicons
                  color={'#131314'}
                  size={28}
                  name="chevron-forward-outline"
                />
              </Pressable>
            )}
          </View>
        )}
      </View>
    </Pressable>
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

ItemResident.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
  onClick: PropTypes.func,
  isCurrent: PropTypes.bool,
  noDetails: PropTypes.bool,
};

export default ItemResident;
