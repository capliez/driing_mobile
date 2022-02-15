import React, { useState } from 'react';
import Step1SignIn from './step1';
import Step1DarkSignIn from './step1Black';
import Step2SignIn from './step2';
import { useSelector } from 'react-redux';

const SignInPage = ({ navigation }) => {
  const [steps, changeStep] = useState({
    step1: true,
    step2: false,
  });
  const { isDarkTheme } = useSelector((state) => state.settings);
  const renderStepCurrent = () => {
    if (steps.step1)
      return isDarkTheme ? (
        <Step1DarkSignIn steps={steps} changeStep={changeStep} />
      ) : (
        <Step1SignIn steps={steps} changeStep={changeStep} />
      );
    if (steps.step2)
      return <Step2SignIn steps={steps} changeStep={changeStep} />;
  };

  return renderStepCurrent();
};

export default SignInPage;
