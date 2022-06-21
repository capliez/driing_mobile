import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ItemDeliver from '../../deliver/item';
import ItemResident from '../../resident/item';

const Autocomplete = ({ options, setValue }) => {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const onChange = (text) => {
    const filteredOptions = options.filter((p) => {
      const fullName = p.lastName
        ? `${p.firstName} ${p.lastName}`
        : p.firstName;

      return fullName.toLowerCase().includes(text.toLowerCase());
    });

    setActiveOption(0);
    setFilteredOptions(filteredOptions);
    setShowOptions(true);
    setSearchTerm(text);
  };

  const onClick = (item) => {
    setValue(item);
    setActiveOption(0);
    setFilteredOptions([]);
    setShowOptions(false);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setActiveOption(0);
      setShowOptions(false);
      setSearchTerm(filteredOptions[activeOption]);
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setActiveOption(activeOption - 1);
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      setActiveOption(activeOption + 1);
    }
  };

  const renderListOptions = () => {
    if (showOptions && searchTerm) {
      if (filteredOptions.length) {
        return (
          <View style={{ marginTop: 10 }}>
            {filteredOptions.map((item, index) => {
              return (
                <ItemResident onClick={onClick} key={item.id} item={item} />
              );
            })}
          </View>
        );
      } else {
        return (
          <View className="no-options">
            <Text>Ce nom n'existe pas !</Text>
          </View>
        );
      }
    }
  };

  return (
    <View>
      <TextInput
        type="text"
        clearButtonMode="always"
        style={styles.inputSearch}
        onChangeText={onChange}
        onKeyDown={onKeyDown}
        placeholderTextColor={'#B0B6BB'}
        placeholder={'Entrer le nom ici'}
        value={searchTerm}
      />
      {renderListOptions()}
    </View>
  );
};

const styles = StyleSheet.create({
  inputSearch: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#D0D0DB',
    borderRadius: 6,
    marginTop: 10,
  },
});

Autocomplete.propTypes = {
  options: PropTypes.instanceOf(Array).isRequired,
  setValue: PropTypes.func,
};

export default Autocomplete;
