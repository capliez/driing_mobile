import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { PACKAGES } from '../../constants/packages';
import { HomeRoot } from '../../constants/routes';
import LayoutDefault from '../../layout';

const HeaderLazyComponent = lazy(
  () => import('../../components/_shared/headerPage'),
);

const ListDeliverLazyComponent = lazy(
  () => import('../../components/deliver/listDeliver'),
);

const DeliverPage = ({ navigation }) => {
  const { t } = useTranslation('deliver');

  return (
    <LayoutDefault navigation={navigation}>
      <HeaderLazyComponent
        title={'📦 Liste des colis en attente'}
        route={HomeRoot}
        navigation={navigation}
      />

      <ListDeliverLazyComponent
        t={t}
        packages={PACKAGES}
        navigation={navigation}
      />
    </LayoutDefault>
  );
};

DeliverPage.propTypes = {
  navigation: PropTypes.object,
};

export default DeliverPage;
