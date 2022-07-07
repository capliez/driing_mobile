import React, { lazy, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import LayoutDefault from '../../layout';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/actions';
import Carousel from 'react-native-anchor-carousel';
import moment from 'moment';
import OnePackageImg from '../../images/packages/onePackage';
import TwoPackageImg from '../../images/packages/twoPackage';
import ThreePackageImg from '../../images/packages/threePackage';
import FourPackageImg from '../../images/packages/fourPackage';
import FivePackageImg from '../../images/packages/fivePackage';
import SixPackageImg from '../../images/packages/sixPackage';
import SevenPackageImg from '../../images/packages/sevenPackage';
import EightPackageImg from '../../images/packages/eightPackage';
import { SvgXml } from 'react-native-svg';
import { ParametersRoot } from '../../constants/routes';

import 'moment/locale/fr';
const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(18);
const itemWidth = slideWidth * 2;

const BlockContactComponent = lazy(
  () => import('../../components/_shared/block/contact'),
);
const ProfilPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const carouselref = useRef(null);
  const [currentMonth, setCurrentMonth] = useState('juillet');
  const { currentUser, loading: loadingUser } = useSelector(
    (state) => state.authUser,
  );
  const { all: allBuildings, loading: loadingBuilding } = useSelector(
    (state) => state.buildings,
  );

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const logout = () => {
    dispatch(logoutUser());
  };

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

  return (
    <LayoutDefault navigation={navigation}>
      <ScrollView
        style={{ marginBottom: 120 }}
        scrollEventThrottle={300}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Text style={styles.textTitle}>🗃 Mon profil</Text>
          <Pressable onPress={() => navigation.navigate(ParametersRoot)}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text>Paramètres</Text>
              <IconIonicons
                style={{ marginLeft: 10 }}
                color={'#131314'}
                size={26}
                name="settings"
              />
            </View>
          </Pressable>
        </View>
        <View
          style={{
            backgroundColor: '#F5F5F7',
            marginTop: 15,
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text style={styles.textName}>{currentUser.fullName}</Text>
          <Text>🏢 Immeuble : {allBuildings.address}</Text>
        </View>
        <BlockContactComponent navigation={navigation} />
        <View style={{ marginTop: 15 }}>
          <Text style={styles.textPackage}>Historique des colis remis</Text>
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

          <View style={{ marginTop: 20 }}>
            <Pressable onPress={() => logout()}>
              <Text
                style={{ textAlign: 'center', textDecorationLine: 'underline' }}
              >
                Se déconnecter
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LayoutDefault>
  );
};

const styles = StyleSheet.create({
  divMain: {
    backgroundColor: '#F5F5F7',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  divFirst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  textName: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#25282C',
    marginBottom: 5,
  },
  textTitle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 24,
    color: '#131314',
  },
});

export default ProfilPage;
