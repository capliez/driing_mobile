import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const InputText = ({
  onChangeText,
  value,
  placeholder,
  label,
  maxLength,
  keyboardType = 'default',
  secureTextEntry = false,
  name,
}) => {
  const { isDarkTheme } = useSelector((state) => state.settings);

  return (
    <View style={{ marginTop: 15 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        nativeID={name}
        maxLength={maxLength}
        keyboardAppearance={isDarkTheme ? 'dark' : 'light'}
        style={styles.inputText}
        onChangeText={(text) =>
          name ? onChangeText(name, text) : onChangeText(text)
        }
        value={value}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        keyboardType={keyboardType}
        clearButtonMode="always"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    fontSize: 16,
    color: '#7A7A8D',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 21,
    color: '#131314',
  },
});

InputText.propTypes = {
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  secureTextEntry: PropTypes.bool,
};

export default InputText;
