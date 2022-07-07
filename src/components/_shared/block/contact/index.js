import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { ContactSyndicRoot } from '../../../../constants/routes';
import ImgContact from '../../../../images/block/contact';
const BlockContact = ({ navigation }) => {
  return (
    <Pressable onPress={() => navigation.navigate(ContactSyndicRoot)}>
      <View style={styles.divMain}>
        <View style={{ width: '65%' }}>
          <Text style={styles.text}>
            Un problème à signaler, une demande particulière ?
          </Text>
          <Pressable
            onPress={() => navigation.navigate(ContactSyndicRoot)}
            style={styles.btn}
          >
            <Text style={styles.textBtn}>Contacter votre syndic</Text>
          </Pressable>
        </View>
        <View style={styles.divLast}>
          <SvgXml
            title={'Contacter votre syndic'}
            xml={ImgContact}
            width={120}
            height={130}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  divMain: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#E8E3F2',
    borderRadius: 10,
    paddingTop: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: '#131314',
  },
  divLast: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  textBtn: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: '#FFFFFF',
  },
  btn: {
    backgroundColor: '#131314',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    width: 185,
    marginTop: 20,
  },
});

BlockContact.propTypes = {
  navigation: PropTypes.object,
};

export default BlockContact;
