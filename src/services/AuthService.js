import makeServerRequest from '../utils/makeServerRequest';

/**
 *
 * @returns {any | false} The authenticated `user` if there's one, false otherwise
 */
export const checkAuth = async () => {
  const res = await makeServerRequest('/public/auth', { useAuth: true });

  if (res.authenticated) return res.user;

  return false;
};

export const signIn = async (username, password) => {
  const result = { user: null, toastMessage: '', failed: false };
  const res = await makeServerRequest('/public/auth', {
    method: 'PUT',
    useAuth: true,
    body: { username, password },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 'OK') {
    console.error(res.error || res.message);
    result.failed = true;

    if (res.status === 'WRONG_PASS' || res.status === 'WRONG_USER')
      return { ...result, toastMessage: res.message };
    else
      return { ...result, toastMessage: 'Ocurrio un error al iniciar sesión' };
  }

  result.user = res.user;
  result.toastMessage = 'Inicio de sesión exitoso';
  return result;
};

export const signUp = async (username, password, role = 'user') => {
  const result = { user: null, toastMessage: '', failed: false };
  const res = await makeServerRequest('/public/auth', {
    method: 'POST',
    useAuth: true,
    body: {
      username,
      password,
      role,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 'OK') {
    console.error(res.error || res.message);
    result.failed = true;

    if (res.status === 'CUSTOMER_EXISTS')
      return { ...result, toastMessage: res.message };
    else return { ...result, toastMessage: 'Ocurrio un error al registrarse' };
  }

  result.user = res.user;
  result.toastMessage = 'Registro exitoso';
  return result;
};

export const createUser = async (
  username,
  password,
  role = 'user',
  name,
  email,
  phone
) => {
  const result = { user: null, toastMessage: '', failed: false };
  const res = await makeServerRequest('/public/users', {
    method: 'POST',
    useAuth: true,
    body: {
      username,
      password,
      name,
      role,
      email,
      phone,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 'OK') {
    console.error(res.error || res.message);
    result.failed = true;

    if (res.status === 'CUSTOMER_EXISTS')
      return { ...result, toastMessage: res.message };
    else return { ...result, toastMessage: 'Ocurrio un error al registrarse' };
  }

  result.user = res.user;
  result.toastMessage = 'Registro exitoso';
  return result;
};

export const signOut = async () => {
  let result = true;
  const res = await makeServerRequest('/public/auth', {
    method: 'DELETE',
    useAuth: true,
  });

  if (res.status !== 'OK') {
    console.error(res.error || res.message);
    res = false;
  }

  return result;
};
