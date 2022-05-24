import { API_URL } from '../config/globals';
import { isEmptyObject } from './helpers';

export default async function makeServerRequest(
  endpoint,
  config = {
    method: 'GET',
    useAuth: false,
    headers: undefined,
    body: undefined,
  }
) {
  const fetchOptions = {
    method: config.method,
  };

  if (config.useAuth) {
    fetchOptions.credentials = 'include';
    fetchOptions.mode = 'cors';
  }

  if (config.body && !isEmptyObject(config.body))
    fetchOptions.body = JSON.stringify(config.body);
  if (config.headers && !isEmptyObject(config.headers))
    fetchOptions.headers = config.headers;

  try {
    const res = await fetch(API_URL + endpoint, fetchOptions);
    return await res.json();
  } catch (err) {
    return { error: err };
  }
}
