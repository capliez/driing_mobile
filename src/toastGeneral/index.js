import React, { useEffect } from 'react';
import { toastError } from '../utils/toast';
import { useSelector } from 'react-redux';
import { isNotEmpty } from '../utils';

const ToastGeneral = () => {
  const { error: errorAuth } = useSelector((state) => state.authUser);
  const { error: errorBuilding } = useSelector((state) => state.buildings);
  const { error: errorPackage } = useSelector((state) => state.packages);
  const { error: errorResident } = useSelector((state) => state.residents);

  useEffect(() => {
    isNotEmpty(errorAuth) && toastError(errorAuth);
  }, [errorAuth]);

  useEffect(() => {
    isNotEmpty(errorBuilding) && toastError(errorBuilding);
  }, [errorBuilding]);

  useEffect(() => {
    isNotEmpty(errorPackage) && toastError(errorPackage);
  }, [errorPackage]);

  useEffect(() => {
    isNotEmpty(errorResident) && toastError(errorResident);
  }, [errorResident]);

  return <></>;
};

export default ToastGeneral;
