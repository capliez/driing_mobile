import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const CODE_LENGTH = 4;

const InputCode = ({
  onClickFunction,
  isSubmit,
  isResult,
  code,
  setCode,
  setIsSubmit,
}) => {
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isCodeFull, setIsCodeFull] = useState(true);

  const codeDigitsArray = new Array(1, 2, 3, 4);
  const { t } = useTranslation('deliver');
  const ref = useRef(null);

  useEffect(() => {
    isSubmit && !isCodeFull && setIsSubmit(false);
  }, [isSubmit, isCodeFull, setIsSubmit]);

  useEffect(() => {
    code.length === CODE_LENGTH && !isCodeFull && setIsCodeFull(true);
    code.length !== CODE_LENGTH && isCodeFull && setIsCodeFull(false);
  }, [code, isCodeFull]);

  const handleOnPress = () => {
    setContainerIsFocused(true);
    ref?.current?.focus();
  };

  const handleOnBlur = () => {
    setContainerIsFocused(false);
  };

  const toDigitInput = (_value, idx) => {
    const emptyInputChar = ' ';
    const digit = code[idx] || emptyInputChar;
    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === CODE_LENGTH - 1;
    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);
    const borderColor = isSubmit
      ? isResult
        ? styles.borderColorSuccess
        : styles.borderColorError
      : styles.borderColorDefault;
    const containerStyle =
      containerIsFocused && isFocused
        ? {
            ...styles.inputContainer,
            ...styles.inputContainerFocused,
            ...borderColor,
          }
        : { ...styles.inputContainer, ...borderColor };

    isCodeFull && buttonDisabled && setButtonDisabled(false);
    !isCodeFull && !buttonDisabled && setButtonDisabled(true);

    return (
      <View key={idx} style={containerStyle}>
        <Text style={styles.inputText}>{digit.toUpperCase()}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.inputsContainer} onPress={handleOnPress}>
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref={ref}
        value={code}
        onChangeText={setCode}
        onSubmitEditing={handleOnBlur}
        keyboardType="default"
        returnKeyType="done"
        autoCapitalize="characters"
        maxLength={CODE_LENGTH}
        style={styles.hiddenCodeInput}
      />
      {(!isResult || !isSubmit) && (
        <>
          <Pressable
            onPress={() => onClickFunction()}
            disabled={buttonDisabled}
            style={
              buttonDisabled ? styles.buttonValidDisabled : styles.buttonValid
            }
          >
            <Text style={styles.buttonValidText}>{t('btnValid')}</Text>
          </Pressable>

          <Text style={styles.textNoCode}>{t('textNoCode')}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  borderColorDefault: {
    borderColor: '#cccccc',
  },
  borderColorSuccess: {
    borderColor: '#4AE397',
  },
  borderColorError: {
    borderColor: '#E34A5C',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  inputContainerFocused: {
    borderColor: '#222235',
  },
  inputText: {
    width: 64,
    height: 66,
    fontSize: 32,
    fontFamily: 'Menlo-Regular',
    textAlign: 'center',
    paddingVertical: 14,
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
  buttonValid: {
    backgroundColor: '#222235',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonValidDisabled: {
    backgroundColor: 'rgba(34, 34, 53, 0.24)',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonValidText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19,
    textTransform: 'uppercase',
  },
  textNoCode: {
    marginTop: 15,
    fontSize: 18,
    lineHeight: 22,
  },
});

InputCode.propTypes = {
  onClickFunction: PropTypes.func,
  isSubmit: PropTypes.bool,
  isResult: PropTypes.bool,
  code: PropTypes.string,
  setCode: PropTypes.func,
  setIsSubmit: PropTypes.func,
};

export default InputCode;
