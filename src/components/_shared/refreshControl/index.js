import React from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const RefreshControlComponent = ({ onRefreshControl }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { t } = useTranslation();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      onRefreshControl && onRefreshControl();
    });
  }, []);

  return (
    <RefreshControl
      title={t('loading')}
      tintColor={'#222235'}
      colors={['#222235']}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

RefreshControlComponent.propTypes = {
  onRefreshControl: PropTypes.func,
};

export default RefreshControlComponent;
