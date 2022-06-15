import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastContext from '../../context/Toast/ToastContext';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { signIn } from '../../services/AuthService';

function Signin() {
  const navigate = useNavigate();
  const { displaySuccessToast, displayErrorToast } = useContext(ToastContext);
  const { setUser, isAuthenticated, isAdmin, init } = useAuth();
  const [values, handleInputChange] = useForm({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (init && isAdmin) {
      navigate('/admin', { replace: true });
      return;
    }

    if (init && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isAdmin, init]);

  const handleSignIn = async e => {
    e.preventDefault();

    const { user, failed, toastMessage } = await signIn(
      values.username,
      values.password
    );

    if (failed) {
      displayErrorToast(toastMessage);
      return;
    }

    displaySuccessToast(toastMessage);
    setUser(user);
  };

  return (
    <div className='admin-signin container'>
      <h1 className='fs-2 mb-4'>Iniciar sesion</h1>
      <div className='card card--dark pt-3'>
        <form className='form'>
          <div className='form__group'>
            <label htmlFor='username' className='form__label'>
              Nombre de usuario
            </label>
            <input
              className='form__input'
              type='text'
              name='username'
              id='username'
              value={values.username}
              onChange={handleInputChange}
            />
          </div>
          <div className='form__group'>
            <label htmlFor='password' className='form__label'>
              Contraseña
            </label>
            <input
              className='form__input'
              type='password'
              name='password'
              id='password'
              value={values.password}
              onChange={handleInputChange}
            />
          </div>
          <div className='form__group mt-2'>
            <button
              className='btn btn--submit btn--right'
              onClick={handleSignIn}>
              Iniciar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
