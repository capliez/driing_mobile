import React, { useEffect } from 'react';
import { toastError } from '../utils/toast';
import { useSelector } from 'react-redux';

const ToastRedux = () => {
  const { error: errorAuth } = useSelector((state) => state.authUser);

  useEffect(() => {
    console.log(errorAuth);
    errorAuth & toastError(errorAuth);
  }, [errorAuth]);

  return <></>;
};

export default ToastRedux;
