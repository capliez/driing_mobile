import PropTypes from 'prop-types';
import React, { lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { HomeRoot } from '../../constants/routes';
import LayoutDefault from '../../layout';
import { getPackages } from '../../redux/packages/actions';
import { isNotEmpty } from '../../utils';

const HeaderLazyComponent = lazy(
  () => import('../../components/_shared/headerPage'),
);

const ListDeliverLazyComponent = lazy(
  () => import('../../components/deliver/listDeliver'),
);

const DeliverPage = ({ navigation }) => {
  const { t } = useTranslation('deliver');
  const { all: allPackages } = useSelector((state) => state.packages);
  const { all: allBuildings, loading: loadingBuilding } = useSelector(
    (state) => state.buildings,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingBuilding && isNotEmpty(allBuildings)) {
      !isNotEmpty(allPackages) && dispatch(getPackages(allBuildings.id));
    }
  }, [allBuildings, dispatch, loadingBuilding, allPackages]);

  return (
    <LayoutDefault navigation={navigation}>
      <HeaderLazyComponent
        title={'📦 Liste des colis en attente'}
        route={HomeRoot}
        navigation={navigation}
      />

      <ListDeliverLazyComponent
        t={t}
        dates={allPackages}
        navigation={navigation}
      />
    </LayoutDefault>
  );
};

DeliverPage.propTypes = {
  navigation: PropTypes.object,
};

export default DeliverPage;
