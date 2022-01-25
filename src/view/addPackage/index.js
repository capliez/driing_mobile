import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import HeaderComponent from '../../components/_shared/headerPage';
import RefreshControlComponent from '../../components/_shared/refreshControl';
import { HomeRoot } from '../../constants/routes';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import AutoComplete from '../../components/_shared/autoComplete';
import { PACKAGES } from '../../constants/packages';
import ItemDeliver from '../../components/deliver/item';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconResult from '../../components/_shared/iconResult';
import ButtonComponent from '../../components/_shared/button';
const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(18);
const itemHorizontalMargin = wp(2);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const AddPackagePage = ({ navigation }) => {
  const { t } = useTranslation('deliver');
  const [nbPackageActive, setNbPackageActive] = useState(null);
  const [housingCurrent, setHousingCurrent] = useState(null);

  const carouselref = useRef(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        scrollEventThrottle={300}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={<RefreshControlComponent />}
      >
        <HeaderComponent route={HomeRoot} navigation={navigation} />
        <View style={styles.divNamePackage}>
          <Text style={styles.textTitle}>Indiquez les détails du colis</Text>

          <View style={styles.divNamePackage2}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textLabel}>Indiquez le nom sur le colis</Text>
              {housingCurrent && <IconResult />}
            </View>
            {housingCurrent && (
              <Pressable
                onPress={() => setHousingCurrent(null)}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text>Modifier</Text>
                <IconMaterialCommunity
                  color={'#000000'}
                  size={16}
                  name="pencil-outline"
                />
              </Pressable>
            )}
          </View>

          {housingCurrent ? (
            <ItemDeliver item={housingCurrent} />
          ) : (
            <AutoComplete setValue={setHousingCurrent} options={PACKAGES} />
          )}
        </View>

        {housingCurrent && (
          <View style={styles.divNbPackage}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textLabel}>Nombre de colis</Text>
              {nbPackageActive && <IconResult />}
            </View>

            <View style={styles.divItemsPackage}>
              <Carousel
                ref={carouselref}
                data={[
                  { id: 1, value: 1 },
                  { id: 2, value: 2 },
                  { id: 3, value: 3 },
                  { id: 4, value: 4 },
                  { id: 5, value: 5 },
                  { id: 6, value: 6 },
                ]}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => setNbPackageActive(item.value)}
                    style={[
                      styles.divItemPackage,
                      nbPackageActive &&
                        nbPackageActive === item.value && {
                          backgroundColor: '#131314',
                        },
                    ]}
                    key={item.id}
                  >
                    <Text
                      style={[
                        styles.textItemPackage,
                        nbPackageActive &&
                          nbPackageActive === item.value && {
                            color: '#FFFFFF',
                          },
                      ]}
                    >
                      {item.value}
                    </Text>
                  </Pressable>
                )}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                inactiveSlideScale={0.95}
                loop={false}
                inactiveSlideOpacity={1}
                enableMomentum={true}
                activeSlideAlignment={'start'}
                activeAnimationType={'spring'}
                activeAnimationOptions={{
                  friction: 4,
                  tension: 40,
                }}
              />
            </View>
          </View>
        )}
        {nbPackageActive && housingCurrent && (
          <View style={{ marginHorizontal: 15, padding: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textLabel}>Photo du bordereau du colis</Text>
              {nbPackageActive && <IconResult />}
            </View>
            <View style={styles.divPictures}>
              <Text style={styles.textPicture}>
                Veuillez prendre en photo le bordereau indiquant le nom et le
                détail du colis.
              </Text>
              <ButtonComponent
                onClick={() => alert('Clique')}
                text="Prendre la photo"
                iconName="camera-outline"
                classBtn={styles.btnPicture}
              />
            </View>
            <ButtonComponent
              onClick={() => alert('Ajouter')}
              text="Ajouter le colis"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  divNamePackage2: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputSearch: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#D0D0DB',
    borderRadius: 4,
    marginTop: 10,
  },
  divNamePackage: {
    marginTop: 15,
    backgroundColor: 'white',
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 5,
  },
  divNbPackage: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 5,
  },
  textTitle: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 25,
  },
  divItemsPackage: {
    marginTop: 20,
    overflow: 'hidden',
  },
  divItemPackage: {
    paddingVertical: 18,
    paddingHorizontal: 4,
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 4,
  },
  textItemPackage: {
    fontWeight: '700',
    fontSize: 20,
  },
  divPictures: {
    marginTop: 15,
    borderWidth: 1.5,
    padding: 30,
    borderColor: '#7A7A8D',
    borderStyle: 'dashed',
  },
  textPicture: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  btnPicture: {
    padding: 15,
    marginHorizontal: 30,
    marginTop: 20,
  },
  btnAdd: {
    backgroundColor: '#131314',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  textBtnPicture: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 21,
    textTransform: 'uppercase',
  },
  textLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21,
  },
  textInfo: {
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 21,
    color: '#7A7A8D',
    marginLeft: 6,
  },
  divInfo: {
    backgroundColor: '#7A7A8D',
    borderRadius: 10,
  },
});

AddPackagePage.propTypes = {
  navigation: PropTypes.object,
};

export default AddPackagePage;
