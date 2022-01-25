import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

const InputSearch = ({ onChangeText, value }) => {
  const { t } = useTranslation('deliver');

  return (
    <View style={styles.divSearch}>
      <Icon name="search" size={25} color="#B0B6BB" />
      <TextInput
        accessible
        accessibilityRole="search"
        accessibilityLabel={t('inputSearch')}
        style={styles.inputSearch}
        onChangeText={onChangeText}
        value={value}
        placeholder={t('inputSearch')}
        keyboardType="default"
        clearButtonMode="always"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  divSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputSearch: {
    marginLeft: 10,
    fontSize: 16,
    color: '#7A7A8D',
    paddingVertical: 15,
    width: 300,
  },
});

InputSearch.propTypes = {
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};

export default InputSearch;
