import React, { lazy } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { ProfilRoot } from '../../constants/routes';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const HeaderLazyComponent = lazy(
  () => import('../../components/_shared/headerPage'),
);

const ParametersPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        scrollEventThrottle={300}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: 15 }}>
          <HeaderLazyComponent
            route={ProfilRoot}
            navigation={navigation}
            isBack={true}
          />
          <View>
            <Text style={styles.title}>Vos paramètres</Text>
          </View>
          <View
            style={{
              padding: 20,
              backgroundColor: '#F5F5F7',
              borderRadius: 10,
              marginTop: 25,
            }}
          >
            <Text style={styles.subTitle}>Besoin d'aide ?</Text>
            <View
              style={{
                marginTop: 30,
                borderBottomWidth: 1,
                borderBottomColor: '#DEE4EB',
                paddingBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconIonicons
                  style={{ marginRight: 10 }}
                  color={'#131314'}
                  size={18}
                  name="cube"
                />

                <Text style={styles.label}>Ajouter un colis</Text>
              </View>

              <IconIonicons
                color={'#131314'}
                size={20}
                name="chevron-forward-outline"
              />
            </View>
            <View
              style={{
                marginTop: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#DEE4EB',
                paddingBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconIonicons
                  style={{ marginRight: 10 }}
                  color={'#131314'}
                  size={18}
                  name="person"
                />

                <Text style={styles.label}>Ajouter un habitant</Text>
              </View>

              <IconIonicons
                color={'#131314'}
                size={20}
                name="chevron-forward-outline"
              />
            </View>
            <View
              style={{
                marginTop: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#DEE4EB',
                paddingBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconIonicons
                  style={{ marginRight: 10 }}
                  color={'#131314'}
                  size={18}
                  name="sync"
                />

                <Text style={styles.label}>Remettre un colis</Text>
              </View>

              <IconIonicons
                color={'#131314'}
                size={20}
                name="chevron-forward-outline"
              />
            </View>
          </View>
          <View
            style={{
              padding: 20,
              backgroundColor: '#F5F5F7',
              borderRadius: 10,
              marginTop: 25,
            }}
          >
            <Text style={styles.subTitle}>Compte</Text>
            <View
              style={{
                marginTop: 30,
                borderBottomWidth: 1,
                borderBottomColor: '#DEE4EB',
                paddingBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconIonicons
                  style={{ marginRight: 10 }}
                  color={'#131314'}
                  size={18}
                  name="settings"
                />

                <Text style={styles.label}>Informations personnelles</Text>
              </View>

              <IconIonicons
                color={'#131314'}
                size={20}
                name="chevron-forward-outline"
              />
            </View>
          </View>
          <View
            style={{
              padding: 20,
              backgroundColor: '#F5F5F7',
              borderRadius: 10,
              marginTop: 25,
            }}
          >
            <Text style={styles.subTitle}>Autres</Text>
            <View
              style={{
                marginTop: 30,
                borderBottomWidth: 1,
                borderBottomColor: '#DEE4EB',
                paddingBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconIonicons
                  style={{ marginRight: 10 }}
                  color={'#131314'}
                  size={18}
                  name="star"
                />

                <Text style={styles.label}>Mettre une bonne note</Text>
              </View>

              <IconIonicons
                color={'#131314'}
                size={20}
                name="chevron-forward-outline"
              />
            </View>
            <View
              style={{
                marginTop: 30,
                borderBottomWidth: 1,
                borderBottomColor: '#DEE4EB',
                paddingBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconIonicons
                  style={{ marginRight: 10 }}
                  color={'#131314'}
                  size={18}
                  name="book"
                />

                <Text style={styles.label}>
                  Condition de vente et d’utilisation
                </Text>
              </View>

              <IconIonicons
                color={'#131314'}
                size={20}
                name="chevron-forward-outline"
              />
            </View>
            <View
              style={{
                marginTop: 30,
                borderBottomWidth: 1,
                borderBottomColor: '#DEE4EB',
                paddingBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconIonicons
                  style={{ marginRight: 10 }}
                  color={'#131314'}
                  size={18}
                  name="information-circle-outline"
                />

                <Text style={styles.label}>Politique de confidentialité</Text>
              </View>

              <IconIonicons
                color={'#131314'}
                size={20}
                name="chevron-forward-outline"
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
  subTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    color: '#131314',
  },
  label: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#131314',
  },
});

export default ParametersPage;
