import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const ButtonComponent = ({
  classBtn,
  classText,
  iconName,
  text,
  onClick,
  isDisabled,
}) => {
  return (
    <Pressable
      disabled={isDisabled}
      onPress={() => onClick()}
      style={[isDisabled ? styles.btnDisabled : styles.btn, classBtn]}
    >
      {iconName && <IconIonicons color={'white'} size={25} name={iconName} />}
      <Text style={[styles.textBtn, classText]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#131314',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDisabled: {
    backgroundColor: '#B8B8B9',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 21,
    textTransform: 'uppercase',
  },
});

ButtonComponent.propTypes = {
  classBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  classText: PropTypes.string,
  iconName: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default ButtonComponent;
