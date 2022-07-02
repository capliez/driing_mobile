import React, { lazy } from 'react';
import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LayoutDefault from '../../layout';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { SignInRoot } from '../../constants/routes';
import { logoutUser } from '../../redux/auth/actions';

const BlockContactComponent = lazy(
  () => import('../../components/_shared/block/contact'),
);
const ProfilPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentUser, loading: loadingUser } = useSelector(
    (state) => state.authUser,
  );
  const { all: allBuildings, loading: loadingBuilding } = useSelector(
    (state) => state.buildings,
  );

  const logout = () => {
    navigation.navigate(SignInRoot);
    dispatch(logoutUser());
  };

  return (
    <LayoutDefault navigation={navigation}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Text style={styles.textTitle}>🗃 Mon profil</Text>
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
      </View>
    </LayoutDefault>
  );
};

const styles = StyleSheet.create({
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
