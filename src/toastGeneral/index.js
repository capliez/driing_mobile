import React, { useEffect } from 'react';
import { toastError, toastSuccess } from '../utils/toast';
import { useSelector, useDispatch } from 'react-redux';
import { isNotEmpty } from '../utils';
import {
  getEmptyErrorPackage,
  getEmptySuccessPackage,
} from '../redux/packages/actions';
import {
  getEmptyErrorResident,
  getEmptySuccessResident,
} from '../redux/residents/actions';

const ToastGeneral = () => {
  const dispatch = useDispatch();
  const { error: errorAuth } = useSelector((state) => state.authUser);
  const { error: errorBuilding } = useSelector((state) => state.buildings);
  const { error: errorPackage, success: successPackage } = useSelector(
    (state) => state.packages,
  );
  const { error: errorResident, success: successResident } = useSelector(
    (state) => state.residents,
  );

  useEffect(() => {
    isNotEmpty(errorAuth) && toastError(errorAuth);
  }, [errorAuth]);

  useEffect(() => {
    isNotEmpty(errorBuilding) && toastError(errorBuilding);
  }, [errorBuilding]);

  useEffect(() => {
    isNotEmpty(errorPackage) && toastError(errorPackage);
    successPackage && toastSuccess('Mis à jour avec succès');

    return () => {
      dispatch(getEmptySuccessPackage());
      dispatch(getEmptyErrorPackage());
    };
  }, [dispatch, errorPackage, successPackage]);

  useEffect(() => {
    isNotEmpty(errorResident) && toastError(errorResident);
    successResident && toastSuccess('Mis à jour avec succès');

    return () => {
      dispatch(getEmptySuccessResident());
      dispatch(getEmptyErrorResident());
    };
  }, [dispatch, errorResident, successResident]);

  return <></>;
};

export default ToastGeneral;
