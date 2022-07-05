import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DeliverListRoot } from '../../constants/routes';
import LayoutDefault from '../../layout';
import moment from 'moment';
import 'moment/locale/fr';

const HeaderLazyComponent = lazy(
  () => import('../../components/_shared/headerPage'),
);

const ListDeliverPackageLazyComponent = lazy(
  () => import('../../components/deliver/listDeliverPackage'),
);

const DeliverPackagePage = ({ navigation, route }) => {
  const { t } = useTranslation('deliver');
  const { items, date } = route.params;
  const { loading: loadingPackages } = useSelector((state) => state.packages);
  const { all: allBuildings } = useSelector((state) => state.buildings);
  return (
    <LayoutDefault navigation={navigation}>
      <HeaderLazyComponent
        title={'Colis du ' + moment(date).locale('fr').format('LL')}
        route={DeliverListRoot}
        navigation={navigation}
        isBack={true}
      />
      <ListDeliverPackageLazyComponent
        t={t}
        packages={items}
        idBuilding={allBuildings.id}
        loadingPackages={loadingPackages}
        navigation={navigation}
      />
    </LayoutDefault>
  );
};

DeliverPackagePage.propTypes = {
  navigation: PropTypes.object,
};

export default DeliverPackagePage;
