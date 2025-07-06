import { useState } from 'react';

const useAuthForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePassword = (value) => value.length >= 6;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? '' : 'Format email tidak valid');
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value) ? '' : 'Password minimal 6 karakter');
  };

  const onChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (!validEmail) setEmailError('Format email tidak valid');
    if (!validPassword) setPasswordError('Password minimal 6 karakter');

    if (validEmail && validPassword && captchaVerified) {
      // Kirim data ke backend di sini
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  const isFormValid = validateEmail(email) && validatePassword(password) && captchaVerified;

  return {
    email,
    emailError,
    password,
    passwordError,
    captchaVerified,
    handleEmailChange,
    handlePasswordChange,
    onChange,
    handleSubmit,
    isFormValid,
  };
};

export default useAuthForm;
