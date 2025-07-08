import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

        const navigate = useNavigate();

  const isFormValid = validateEmail(email) && validatePassword(password) && captchaVerified;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (!validEmail) setEmailError('Format email tidak valid');
    if (!validPassword) setPasswordError('Password minimal 6 karakter');

    if (validEmail && validPassword && captchaVerified) {
      try {
        const response = await fetch ('https://dkos-mranggen-clabs-production.up.railway.app/api/auth/login',{
          method : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login berhasil');

        console.log('DATA LOGIN:', data);

      const userEmail = data.user?.email || data.email;

        if (userEmail === 'dmranggenkost@gmail.com') {
          navigate('/PageDashboardAdmin');
        } else {
          navigate('/HomePage');
        } 
      } else {
        alert('Login gagal: ' + data.message);
        }
      }catch (error) {
        alert('Terjadi kesalahan: ' + error.message);
        console.error('Login error:', error);
      }
    }
  };

  

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
