import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { DeliverListRoot } from '../../../constants/routes';
import ImgPackage from '../../../images/packages/onePackage';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const BlockDeliverPackage = ({ navigation }) => {
  return (
    <Pressable onPress={() => navigation.navigate(DeliverListRoot)}>
      <View style={styles.divMain}>
        <View>
          <Text style={styles.text}>Colis en attente :</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <SvgXml
              title={'Contacter votre syndic'}
              xml={ImgPackage}
              width={46}
              height={35}
            />
            <Text style={styles.textCount}>12</Text>
          </View>
        </View>
        <View style={styles.divLast}>
          <Pressable onPress={() => navigation.navigate(DeliverListRoot)}>
            <IconIonicons
              color={'#131314'}
              size={28}
              name="chevron-forward-outline"
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  divMain: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F2EEE3',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: '#222235',
    marginBottom: 20,
  },
  textCount: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 36,
    lineHeight: 44,
    color: '#222235',
    marginLeft: 10,
  },
  divLast: {
    display: 'flex',
    justifyContent: 'center',
  },
});

BlockDeliverPackage.propTypes = {
  navigation: PropTypes.object,
};

export default BlockDeliverPackage;
