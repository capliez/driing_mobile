import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { PACKAGES } from '../../constants/packages';
import { HomeRoot } from '../../constants/routes';
import LayoutDefault from '../../layout';

const HeaderLazyComponent = lazy(
  () => import('../../components/_shared/headerPage'),
);

const ListResidentLazyComponent = lazy(
  () => import('../../components/resident/list'),
);

const ListResident = ({ navigation }) => {
  const { t } = useTranslation('resident');

  return (
    <LayoutDefault navigation={navigation}>
      <HeaderLazyComponent
        title={'🎈 Vos habitants'}
        route={HomeRoot}
        navigation={navigation}
      />
      <ListResidentLazyComponent
        t={t}
        packages={PACKAGES}
        navigation={navigation}
      />
    </LayoutDefault>
  );
};

ListResident.propTypes = {
  navigation: PropTypes.object,
};

export default ListResident;
