import React from 'react';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
const IconResult = ({ success }) => {
  return (
    <IconMaterialCommunity
      style={{ marginLeft: 6 }}
      size={22}
      color="#4AE397"
      name="checkbox-marked-circle"
    />
  );
};

IconResult.propTypes = {
  success: PropTypes.bool,
};

export default IconResult;
