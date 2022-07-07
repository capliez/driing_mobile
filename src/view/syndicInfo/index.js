import React, { lazy } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Linking,
} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { ProfilRoot } from '../../constants/routes';
import UserAvatar from 'react-native-user-avatar';
import { SvgXml } from 'react-native-svg';
import CallSyndicImg from '../../images/block/callSyndic';

const HeaderLazyComponent = lazy(
  () => import('../../components/_shared/headerPage'),
);

const InfoSyndic = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ marginHorizontal: 15 }}>
        <HeaderLazyComponent
          route={ProfilRoot}
          navigation={navigation}
          isBack={true}
        />
        <View>
          <Text style={styles.title}>Informations de votre syndic</Text>
        </View>
        <View accessible accessibilityRole="tab" style={styles.divItem}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.divItemProfile}>
              <UserAvatar size={50} style={styles.userProfile} name={'JEAN'} />
            </View>
            <View style={styles.divItemLabel}>
              <View style={{ marginBottom: 5 }}>
                <Text
                  accessible
                  accessibilityRole="text"
                  accessibilityLabel={'JEAN'}
                  style={styles.textNameUser}
                >
                  JEAN
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  accessible
                  accessibilityRole="text"
                  accessibilityLabel={'Nombre de colis'}
                  style={styles.textItemLabel}
                >
                  📬 Adresse :
                </Text>
                <Text
                  accessible
                  accessibilityRole="text"
                  accessibilityLabel={2}
                  style={styles.textItemValue}
                >
                  14 rue des losanges
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
                  accessibilityLabel={'Disponible'}
                  style={styles.textItemLabel}
                >
                  ⏰ Disponible : 7j/7
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Pressable onPress={() => Linking.openURL(`tel:0767514913`)}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 20,
              backgroundColor: '#E3EDF2',
              borderRadius: 10,
            }}
          >
            <View>
              <IconIonicons color={'#131314'} size={50} name="call" />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  lineHeight: 29,
                  marginBottom: 10,
                }}
              >
                07 67 51 49 13
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '600', lineHeight: 19 }}>
                Numéro de téléphone du syndic
              </Text>
            </View>
          </View>
        </Pressable>

        <View style={{ marginVertical: 20 }}>
          <Text style={styles.title2}>Besoin d’être recontacté ?</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F5F5F7',
            borderRadius: 10,
          }}
        >
          <View style={{ padding: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                lineHeight: 19,
                marginBottom: 10,
              }}
            >
              Vous souhaitez être {'\n'} rappelé pour un soucis ?
            </Text>
            <Pressable
              style={{
                backgroundColor: '#131314',
                borderRadius: 6,
                padding: 10,
              }}
            >
              <Text
                style={{ color: 'white', textAlign: 'center', fontSize: 14 }}
              >
                Demander à être rappelé
              </Text>
            </Pressable>
          </View>
          <View>
            <SvgXml
              title={'Appelez le syndic'}
              xml={CallSyndicImg}
              width={105}
              height={116}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 29,
    color: '#131314',
  },
  title2: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: '#131314',
  },
  divItem: {
    backgroundColor: '#F5F5F7',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userProfile: {
    width: 55,
    height: 55,
    borderRadius: 30,
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
});

export default InfoSyndic;
