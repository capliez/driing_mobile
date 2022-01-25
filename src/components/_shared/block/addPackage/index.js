import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { AddPackageRoot } from '../../../../constants/routes';
import ImgAddPackage from '../../../../images/block/addPackage';
const BlockAddPackage = ({ navigation }) => {
  return (
    <View style={styles.divMain}>
      <View style={{ width: '65%' }}>
        <Text style={styles.text}>Vous avez reçu des colis ?</Text>
        <Text style={styles.text}>Ajoutez-les !</Text>
        <Pressable
          onPress={() => navigation.navigate(AddPackageRoot)}
          style={styles.btn}
        >
          <Text style={styles.textBtn}>Ajouter des colis</Text>
        </Pressable>
      </View>
      <View style={styles.divLast}>
        <SvgXml
          title={"Ajout d'un colis"}
          xml={ImgAddPackage}
          width={120}
          height={130}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  divMain: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#E3EDF2',
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
    width: 144,
    marginTop: 20,
  },
});

BlockAddPackage.propTypes = {
  navigation: PropTypes.object,
};

export default BlockAddPackage;
