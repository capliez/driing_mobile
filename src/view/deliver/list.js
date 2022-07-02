import PropTypes from 'prop-types';
import React, { lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { HomeRoot } from '../../constants/routes';
import LayoutDefault from '../../layout';
import { getPackages } from '../../redux/packages/actions';
import { isNotEmpty, isNotEmptyArray } from '../../utils';

const HeaderLazyComponent = lazy(
  () => import('../../components/_shared/headerPage'),
);

const ListDeliverLazyComponent = lazy(
  () => import('../../components/deliver/listDeliver'),
);

const DeliverPage = ({ navigation }) => {
  const { t } = useTranslation('deliver');
  const { all: allPackages, loading: loadingPackages } = useSelector(
    (state) => state.packages,
  );
  const { all: allBuildings, loading: loadingBuilding } = useSelector(
    (state) => state.buildings,
  );

  const { allSearch: allResidentSearch, loading: loadingResident } =
    useSelector((state) => state.residents);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingBuilding && isNotEmpty(allBuildings)) {
      !isNotEmptyArray(allPackages) && dispatch(getPackages(allBuildings.id));
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
        allResidentSearch={allResidentSearch}
        loadingResident={loadingResident}
        loadingPackages={loadingPackages}
        items={allPackages}
        allBuildings={allBuildings}
        navigation={navigation}
      />
    </LayoutDefault>
  );
};

DeliverPage.propTypes = {
  navigation: PropTypes.object,
};

export default DeliverPage;
