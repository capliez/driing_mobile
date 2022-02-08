import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import UserAvatar from 'react-native-user-avatar';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import OnePackageImg from '../../images/packages/onePackage';

const ItemOneRow = ({ item, navigation, onClick }) => {
  const { t } = useTranslation('deliver');

  return (
    <View accessible accessibilityRole="tab" style={styles.divMain}>
      <View style={styles.divFirst}>
        <View>
          <Text style={styles.titleDate}>Lundi 27 Novembre</Text>
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
            xml={OnePackageImg}
            width={45}
            height={45}
          />
        </View>
        <View style={styles.divUsers}>
          <UserAvatar size={24} name="Avishay Bar" />
          <UserAvatar size={24} name="Bob Dylem" />
          <UserAvatar
            style={{ marginLeft: 5 }}
            size={24}
            name="+1"
            bgColor={'#B0B6BB'}
          />
        </View>
      </View>
    </View>
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
  divUsers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

ItemOneRow.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
  onClick: PropTypes.func,
};

export default ItemOneRow;
