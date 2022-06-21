import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Moment from 'react-moment';
import { Image, StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { DeliverCurrentRoot } from '../../constants/routes';
import { useTranslation } from 'react-i18next';
import UserAvatar from 'react-native-user-avatar';
import OnePackageImg from '../../images/packages/onePackage';
import { SvgXml } from 'react-native-svg';
import ButtonComponent from '../../components/_shared/button';
import { useDispatch } from 'react-redux';
import { updatePackage } from '../../redux/packages/actions';

const ItemPackage = ({ item, loadingPackages }) => {
  const { t } = useTranslation('deliver');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const submitBulky = () => {
    dispatch(updatePackage(item.id));
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={styles.modalTitle}>Informations du colis</Text>
              <View style={styles.divIcon}>
                <Pressable
                  accessible
                  accessibilityRole="button"
                  accessibilityLabel={t('btnReturnOfPageHome')}
                  accessibilityHint={t('btnReturnScreenPrevious')}
                  onPress={() => setModalVisible(false)}
                >
                  <IconIonicons color={'white'} size={24} name="close" />
                </Pressable>
              </View>
            </View>

            <View
              style={{ backgroundColor: '#F5F5F7', padding: 15, marginTop: 30 }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <UserAvatar
                  size={60}
                  style={styles.userProfileModal}
                  name={item.resident.lastName}
                />
                <SvgXml
                  title={'Nombre de colis'}
                  xml={OnePackageImg}
                  width={70}
                  height={70}
                />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text
                  accessible
                  accessibilityRole="text"
                  accessibilityLabel={item.resident.lastName}
                  style={styles.textNameUser}
                >
                  {item.resident.lastName.toUpperCase()}
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
                  {item.createdAt}
                </Moment>
              </View>
            </View>
            <ButtonComponent
              isDisabled={loadingPackages || item.isBulky}
              onClick={() => submitBulky()}
              text="Colis remis"
            />
          </View>
        </View>
      </Modal>
      <View accessible accessibilityRole="tab" style={styles.divItem}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.divItemProfile}>
            <UserAvatar
              style={styles.userProfile}
              name={item.resident.lastName}
            />
          </View>
          <View style={styles.divItemLabel}>
            <View style={{ marginBottom: 5 }}>
              <Text
                accessible
                accessibilityRole="text"
                accessibilityLabel={item.resident.lastName}
                style={styles.textNameUser}
              >
                {item.resident.lastName.toUpperCase()}
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
                {item.createdAt}
              </Moment>
            </View>
          </View>
        </View>
        <View style={styles.divLast}>
          <Pressable onPress={() => setModalVisible(true)}>
            <IconIonicons
              color={'#131314'}
              size={28}
              name="chevron-forward-outline"
            />
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 36,
    color: '#131314',
  },
  divIcon: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#B0B6BB',
    borderRadius: 30,
    width: 40,
    backgroundColor: '#B0B6BB',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
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
  userProfileModal: {
    width: 65,
    height: 65,
    borderRadius: 35,
    borderColor: 'white',
    borderWidth: 4,
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

ItemPackage.propTypes = {
  item: PropTypes.object,
};

export default ItemPackage;
