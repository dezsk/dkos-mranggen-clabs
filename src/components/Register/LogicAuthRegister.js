import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogicAuthRegister = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePassword = (value) => value.length >= 6;

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

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

  const togglePassword = () => setShowPassword((prev) => !prev);

  const isFormValid = name && phone && validateEmail(email) && validatePassword(password) && captchaVerified;

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (!validEmail) setEmailError('Format email tidak valid');
    if (!validPassword) setPasswordError('Password minimal 6 karakter');

    if (name && validEmail && validPassword && captchaVerified) {
      try {
        const response = await fetch('https://dkos-mranggen-clabs-production.up.railway.app/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role: 'user',
            adminSecretKey: '', // Kosong karena ini user biasa
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Registrasi berhasil!');
          navigate('/');
        } else {
          alert(`Gagal: ${data.message || 'Terjadi kesalahan'}`);
        }
      } catch (error) {
        alert('Terjadi kesalahan koneksi ke server');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    name,
    phone,
    email,
    emailError,
    password,
    passwordError,
    captchaVerified,
    handleNameChange,
    handlePhoneChange,
    handleEmailChange,
    handlePasswordChange,
    onChange,
    handleSubmit,
    showPassword,
    togglePassword,
    isFormValid,
    handleBackClick,
    navigate,
    useNavigate,
    isSubmitting
  };
};

export default LogicAuthRegister;
