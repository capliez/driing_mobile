import React from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';

const RefreshControlComponent = ({ onRefreshControl, loading }) => {
  const { t } = useTranslation();
  const onRefresh = React.useCallback(() => {
    onRefreshControl && onRefreshControl();
  }, [onRefreshControl]);

  return (
    <RefreshControl
      title={t('loading')}
      tintColor={'#222235'}
      colors={['#222235']}
      refreshing={loading}
      onRefresh={onRefresh}
    />
  );
};

RefreshControlComponent.propTypes = {
  onRefreshControl: PropTypes.func,
  loading: PropTypes.bool,
};

export default RefreshControlComponent;
