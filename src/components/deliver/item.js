import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import UserAvatar from 'react-native-user-avatar';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import OnePackageImg from '../../images/packages/onePackage';
import moment from 'moment';
import 'moment/locale/fr';
import { DeliverListPackageRoot } from '../../constants/routes';

const ItemOneRow = ({ date, navigation, onClick }) => {
  const { t } = useTranslation('deliver');

  const nbPackages = (items) => {
    let count = 0;

    items.map((i) => (count += i.nbPackage));

    return count;
  };

  const renderResident = (items) => {
    const arrayresident = [];
    items.map((i) => {
      const indexCurrent = arrayresident.findIndex((a) => a === i.resident.id);
      if (indexCurrent === -1) arrayresident.push(i.resident.id);
    });
    return arrayresident.map((a) => {
      const residentCurrent = items.find((i) => i.resident.id === a);
      return (
        <UserAvatar
          key={residentCurrent.id}
          size={24}
          name={residentCurrent.resident.lastName}
        />
      );
    });
  };

  return Object.entries(date).map((k, i) => (
    <Pressable
      key={i}
      onPress={() =>
        navigation.navigate(DeliverListPackageRoot, { date: k[0], items: k[1] })
      }
    >
      <View accessible accessibilityRole="tab" style={styles.divMain}>
        <View style={styles.divFirst}>
          <View>
            <Text style={styles.titleDate}>
              {moment(k[0]).local('fr').format('LL')}
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
            <Text style={{ marginRight: 10 }}>{nbPackages(k[1])} colis</Text>
            <SvgXml
              title={'Nombre de colis'}
              xml={OnePackageImg}
              width={45}
              height={45}
            />
          </View>
          <View style={styles.divUsers}>{renderResident(k[1])}</View>
        </View>
      </View>
    </Pressable>
  ));
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
  divUsers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

ItemOneRow.propTypes = {
  packages: PropTypes.array,
  navigation: PropTypes.object,
  onClick: PropTypes.func,
};

export default ItemOneRow;
