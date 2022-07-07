import PropTypes from 'prop-types';
import React, { lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AddResidentRoot } from '../../constants/routes';
import LayoutDefault from '../../layout';
import { useSelector, useDispatch } from 'react-redux';
import { getResidents } from '../../redux/residents/actions';
import { isNotEmpty } from '../../utils';

const HeaderLazyComponent = lazy(
  () => import('../../components/_shared/headerPage'),
);

const ListResidentLazyComponent = lazy(
  () => import('../../components/resident/list'),
);

const ListResident = ({ navigation }) => {
  const { t } = useTranslation('resident');
  const dispatch = useDispatch();
  const { all: allBuildings, loading: loadingBuilding } = useSelector(
    (state) => state.buildings,
  );
  const { all: allResidents, loading: loadingResidents } = useSelector(
    (state) => state.residents,
  );

  useEffect(() => {
    if (
      !loadingBuilding &&
      isNotEmpty(allBuildings) &&
      !isNotEmpty(allResidents)
    ) {
      dispatch(getResidents(allBuildings.id));
    }
  }, [allBuildings, dispatch, loadingBuilding, allResidents]);

  return (
    <LayoutDefault navigation={navigation}>
      <HeaderLazyComponent
        title={'🎈 Vos habitants'}
        route={AddResidentRoot}
        isResident={true}
        navigation={navigation}
      />
      <ListResidentLazyComponent
        t={t}
        allBuildings={allBuildings}
        residents={allResidents}
        loadingResidents={loadingResidents}
        navigation={navigation}
      />
    </LayoutDefault>
  );
};

ListResident.propTypes = {
  navigation: PropTypes.object,
};

export default ListResident;
