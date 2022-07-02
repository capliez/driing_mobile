import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HeaderComponent from '../../components/_shared/headerPage';
import { HomeRoot } from '../../constants/routes';
import AutoComplete from '../../components/_shared/autoComplete';
import ItemResident from '../../components/resident/item';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconResult from '../../components/_shared/iconResult';
import ButtonComponent from '../../components/_shared/button';
import { useSelector, useDispatch } from 'react-redux';
import { isNotEmpty } from '../../utils';
import { getResidents } from '../../redux/residents/actions';
import Carousel from 'react-native-anchor-carousel';
import { SvgXml } from 'react-native-svg';
import PackageImg from '../../images/addpackage/package';
import MetreImg from '../../images/addpackage/metre';
import {
  registerPackage,
  getPackagesNoHandedOver,
  getPackages,
} from '../../redux/packages/actions';

const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(18);
const itemWidth = slideWidth * 2;

const AddPackagePage = ({ navigation }) => {
  const [nbPackageActive, setNbPackageActive] = useState(null);
  const [residentCurrent, setResidentCurrent] = useState(null);
  const [isPicture] = useState(false);
  const [isBulky, setIsBulky] = useState(false);
  const carouselref = useRef(null);

  const dispatch = useDispatch();
  const { all: allBuildings, loading: loadingBuilding } = useSelector(
    (state) => state.buildings,
  );
  const { all: allResidents } = useSelector((state) => state.residents);
  const { loading: loadingPackages, success: successPackages } = useSelector(
    (state) => state.packages,
  );
  const { currentUser } = useSelector((state) => state.authUser);

  useEffect(() => {
    if (successPackages) {
      if (!loadingBuilding && isNotEmpty(allBuildings)) {
        dispatch(getPackagesNoHandedOver(allBuildings.id));
        dispatch(getPackages(allBuildings.id));
      }
      navigation.navigate(HomeRoot);
    }
  }, [allBuildings, dispatch, loadingBuilding, navigation, successPackages]);

  useEffect(() => {
    if (
      !loadingBuilding &&
      isNotEmpty(allBuildings) &&
      !isNotEmpty(allResidents)
    ) {
      dispatch(getResidents(allBuildings.id));
    }
  }, [allBuildings, dispatch, loadingBuilding, allResidents]);

  const submitPackage = () => {
    dispatch(
      registerPackage({
        isBulky,
        resident: residentCurrent,
        nbPackage: nbPackageActive,
        building: allBuildings,
        guardian: currentUser,
      }),
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        scrollEventThrottle={300}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <HeaderComponent
          route={HomeRoot}
          navigation={navigation}
          isBack={true}
        />
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
              {residentCurrent && <IconResult />}
            </View>
            {residentCurrent && (
              <Pressable
                disabled={loadingPackages}
                onPress={() => setResidentCurrent(null)}
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

          {residentCurrent ? (
            <ItemResident item={residentCurrent} />
          ) : (
            <AutoComplete
              setValue={setResidentCurrent}
              options={allResidents}
            />
          )}
        </View>

        {residentCurrent && (
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
                    disabled={loadingPackages}
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
                itemWidth={itemWidth}
                separatorWidth={0}
                containerWidth={viewportWidth * 0.8}
                inActiveScale={0.95}
              />
            </View>
          </View>
        )}
        {nbPackageActive && residentCurrent && (
          <View style={{ marginHorizontal: 15, padding: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textLabel}>Détails colis</Text>
              {nbPackageActive && <IconResult />}
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}
            >
              <View
                style={[styles.divPackages, isBulky && styles.packageActive]}
              >
                <Pressable
                  disabled={loadingPackages}
                  onPress={() => setIsBulky(true)}
                  style={styles.buttonPackage}
                >
                  <SvgXml
                    title={'Colis volumineux'}
                    xml={PackageImg}
                    width={76}
                    height={58}
                  />
                  <SvgXml
                    title={'Colis volumineux'}
                    xml={MetreImg}
                    width={12}
                    height={60}
                  />
                </Pressable>
                <Text style={styles.textPackageVolum}>Colis volumineux</Text>
              </View>
              <View
                style={[
                  styles.divPackages,
                  isBulky == false && styles.packageActive,
                ]}
              >
                <Pressable
                  disabled={loadingPackages}
                  onPress={() => setIsBulky(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <SvgXml
                    title={'Colis non volumineux'}
                    xml={PackageImg}
                    width={76}
                    height={58}
                  />
                </Pressable>
                <Text style={styles.textPackageVolum}>
                  Colis non volumineux
                </Text>
              </View>
            </View>
            <ButtonComponent
              isDisabled={loadingPackages}
              onClick={() => submitPackage()}
              text="Ajouter le colis"
            />
          </View>
        )}
        {nbPackageActive && isPicture && residentCurrent && (
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
  packageActive: {
    borderWidth: 1,
    borderColor: '#4AE397',
  },
  buttonPackage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divPackages: {
    display: 'flex',
    borderRadius: 15,
    padding: 20,
    backgroundColor: '#F5F5F7',
  },
  textPackageVolum: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: '#000000',
  },
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
