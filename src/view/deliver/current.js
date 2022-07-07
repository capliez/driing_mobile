import PropTypes from 'prop-types';
import React, { lazy, useState, useRef } from 'react';
import Moment from 'react-moment';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import HeaderComponent from '../../components/_shared/headerPage';
import { ResidentListRoot } from '../../constants/routes';
import { useSelector } from 'react-redux';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import OnePackageImg from '../../images/packages/onePackage';
import TwoPackageImg from '../../images/packages/twoPackage';
import ThreePackageImg from '../../images/packages/threePackage';
import FourPackageImg from '../../images/packages/fourPackage';
import FivePackageImg from '../../images/packages/fivePackage';
import SixPackageImg from '../../images/packages/sixPackage';
import SevenPackageImg from '../../images/packages/sevenPackage';
import EightPackageImg from '../../images/packages/eightPackage';
import UserAvatar from 'react-native-user-avatar';
import Carousel from 'react-native-anchor-carousel';
import moment from 'moment';
import 'moment/locale/fr';
const ItemLazyComponent = lazy(() => import('../../components/resident/item'));
const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(18);
const itemWidth = slideWidth * 2;

const CurrentDeliver = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { current, loading: loadingResident } = useSelector(
    (state) => state.residents,
  );
  const carouselref = useRef(null);
  const [currentMonth, setCurrentMonth] = useState('juillet');

  const renderImgPackages = (nb) => {
    switch (nb) {
      case 1:
        return OnePackageImg;
      case 2:
        return TwoPackageImg;
      case 3:
        return ThreePackageImg;
      case 4:
        return FourPackageImg;
      case 5:
        return FivePackageImg;
      case 6:
        return SixPackageImg;
      case 7:
        return SevenPackageImg;
      default:
        return EightPackageImg;
    }
  };
  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const openModal = () => setModalVisible(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        scrollEventThrottle={300}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ margin: 15 }}>
          <HeaderComponent
            route={ResidentListRoot}
            navigation={navigation}
            isBack={true}
          />
          {!loadingResident && current && (
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
                      <Text style={styles.modalTitle}>
                        Informations du colis
                      </Text>
                      <View style={styles.divIcon}>
                        <Pressable
                          accessible
                          accessibilityRole="button"
                          onPress={() => setModalVisible(false)}
                        >
                          <IconIonicons
                            color={'white'}
                            size={24}
                            name="close"
                          />
                        </Pressable>
                      </View>
                    </View>

                    <View
                      style={{
                        backgroundColor: '#F5F5F7',
                        padding: 15,
                        marginTop: 30,
                        borderRadius: 10,
                      }}
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
                          name={current.lastName}
                        />
                        <SvgXml
                          title={'Nombre de colis'}
                          xml={renderImgPackages(current.nbPackage)}
                          width={70}
                          height={70}
                        />
                      </View>
                      <View style={{ marginVertical: 10 }}>
                        <Text
                          accessible
                          accessibilityRole="text"
                          accessibilityLabel={current.lastName}
                          style={styles.textNameUser}
                        >
                          {current.lastName.toUpperCase()}
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Text
                          accessible
                          accessibilityRole="text"
                          style={styles.textItemLabel}
                        >
                          📬 Nombre de colis :
                        </Text>
                        <Text
                          accessible
                          accessibilityRole="text"
                          accessibilityLabel={current.countPackages}
                          style={styles.textItemValue}
                        >
                          {current.countPackages}
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
                          style={styles.textItemLabel}
                        >
                          ⏰ Date :
                        </Text>
                        <Moment
                          accessible
                          accessibilityRole="text"
                          style={styles.textItemValue}
                          format="DD.MM.YYYY hh:mm"
                          element={Text}
                        >
                          {current.createdAt}
                        </Moment>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
              <ItemLazyComponent
                isCurrent={true}
                navigation={navigation}
                item={current}
              />
              <View>
                <Text style={styles.title}>Colis en attente</Text>
                {current.packageHandedOver ? (
                  <ItemLazyComponent
                    noDetails={true}
                    onClick={openModal}
                    item={current}
                  />
                ) : (
                  <View
                    style={{
                      backgroundColor: '#F5F5F7',
                      marginTop: 15,
                      padding: 15,
                      borderRadius: 10,
                      alignItems: 'center',
                    }}
                  >
                    <IconIonicons
                      style={{ marginLeft: 10 }}
                      color={'#131314'}
                      size={26}
                      name="happy"
                    />
                    <Text>Aucun colis</Text>
                  </View>
                )}
              </View>
            </>
          )}
          <View style={{ marginTop: 15 }}>
            <Text style={styles.title}>Historique de ses colis</Text>
            <Carousel
              ref={carouselref}
              data={Array.apply(0, Array(6)).map(function (_, i) {
                return moment()
                  .locale('fr')
                  .month(i + 6)
                  .format('MMMM');
              })}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setCurrentMonth(item)}
                  style={[
                    styles.divItemPackage,
                    currentMonth &&
                    currentMonth.toUpperCase() === item.toUpperCase() && {
                      backgroundColor: '#131314',
                    },
                  ]}
                  key={item}
                >
                  <Text
                    style={[
                      styles.textItemPackage,
                      currentMonth &&
                      currentMonth.toUpperCase() === item.toUpperCase() && {
                        color: '#FFFFFF',
                      },
                    ]}
                  >
                    {capitalize(item)}
                  </Text>
                </Pressable>
              )}
              itemWidth={itemWidth}
              separatorWidth={0}
              containerWidth={viewportWidth * 1}
              inActiveScale={0.95}
            />

            {currentMonth != 'juillet' ? (
              <View
                style={{
                  backgroundColor: '#F5F5F7',
                  marginTop: 15,
                  padding: 15,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
              >
                <IconIonicons
                  style={{ marginLeft: 10 }}
                  color={'#131314'}
                  size={26}
                  name="sad"
                />
                <Text>Rien pour le moment</Text>
              </View>
            ) : (
              <>
                <View accessible accessibilityRole="tab" style={styles.divMain}>
                  <View style={styles.divFirst}>
                    <View>
                      <Text style={styles.titleDate}>
                        {capitalize(
                          moment('07/06/2022')
                            .locale('fr')
                            .format('dddd Do MMMM'),
                        )}
                      </Text>
                    </View>
                    <View>
                      <IconIonicons
                        color={'#131314'}
                        size={26}
                        name="chevron-forward-outline"
                      />
                    </View>
                  </View>
                  <View style={styles.divLast}>
                    <View style={styles.divLastOne}>
                      <Text style={{ marginRight: 10 }}>7 colis</Text>
                      <SvgXml
                        title={'Nombre de colis'}
                        xml={renderImgPackages(7)}
                        width={45}
                        height={45}
                      />
                    </View>
                  </View>
                </View>
                <View accessible accessibilityRole="tab" style={styles.divMain}>
                  <View style={styles.divFirst}>
                    <View>
                      <Text style={styles.titleDate}>
                        {capitalize(
                          moment('07/05/2022')
                            .locale('fr')
                            .format('dddd Do MMMM'),
                        )}
                      </Text>
                    </View>
                    <View>
                      <IconIonicons
                        color={'#131314'}
                        size={26}
                        name="chevron-forward-outline"
                      />
                    </View>
                  </View>
                  <View style={styles.divLast}>
                    <View style={styles.divLastOne}>
                      <Text style={{ marginRight: 10 }}>2 colis</Text>
                      <SvgXml
                        title={'Nombre de colis'}
                        xml={renderImgPackages(2)}
                        width={45}
                        height={45}
                      />
                    </View>
                  </View>
                </View>
                <View accessible accessibilityRole="tab" style={styles.divMain}>
                  <View style={styles.divFirst}>
                    <View>
                      <Text style={styles.titleDate}>
                        {capitalize(
                          moment('07/04/2022')
                            .locale('fr')
                            .format('dddd Do MMMM'),
                        )}
                      </Text>
                    </View>
                    <View>
                      <IconIonicons
                        color={'#131314'}
                        size={26}
                        name="chevron-forward-outline"
                      />
                    </View>
                  </View>
                  <View style={styles.divLast}>
                    <View style={styles.divLastOne}>
                      <Text style={{ marginRight: 10 }}>5 colis</Text>
                      <SvgXml
                        title={'Nombre de colis'}
                        xml={renderImgPackages(5)}
                        width={45}
                        height={45}
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  title: {
    marginVertical: 10,
    color: '#222235',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
  },
  divItemPackage: {
    paddingVertical: 18,
    paddingHorizontal: 4,
    marginTop: 20,
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 4,
  },
  textItemPackage: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 21,
  },
  textPackage: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: '#131314',
  },
  divMain: {
    backgroundColor: '#F5F5F7',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  titleDate: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
  },
  divLastOne: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divFirst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textName: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#25282C',
    marginBottom: 5,
  },
});

CurrentDeliver.propTypes = {
  navigation: PropTypes.object,
};

export default CurrentDeliver;
