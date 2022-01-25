import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchWithCode from '../_shared/inputCode';
import ItemSearchWithCode from './itemSearchWithCode';

const MainWithCode = ({ t, packages }) => {
  const [code, setCode] = useState('');
  const [packageCurrent, setPackageCurrent] = useState(null);
  const [isResult, setIsResult] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const onSearchPackage = () => {
    const index = packages.findIndex((p) => p.code == code);
    if (index !== -1) {
      setPackageCurrent(packages[index]);
      setIsResult(true);
    } else {
      setIsResult(false);
      setPackageCurrent(null);
    }

    setIsSubmit(true);
  };

  return (
    <>
      <View style={styles.divResult}>
        <SearchWithCode
          setCode={setCode}
          setIsSubmit={setIsSubmit}
          code={code}
          isSubmit={isSubmit}
          isResult={isResult}
          onClickFunction={onSearchPackage}
        />
        {packageCurrent && isResult && isSubmit && (
          <ItemSearchWithCode item={packageCurrent} t={t} />
        )}
        {!isResult && isSubmit && (
          <Text style={styles.textNoResult}>{t('noResultCode')}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  divResult: {
    marginHorizontal: 15,
  },
  textNoResult: {
    textAlign: 'center',
    color: '#E34A5C',
    fontSize: 16,
  },
});

MainWithCode.propTypes = {
  t: PropTypes.any,
  packages: PropTypes.array,
};

export default MainWithCode;
