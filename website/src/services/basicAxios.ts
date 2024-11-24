/**
 * No cookies are sent by default
 */

// import { BACKEND_URL } from '@/const';
// import { readCSRFToken } from '@/utils/readCSRFToken';
import axios, { AxiosRequestConfig } from 'axios';

export const basicAxios = async (
  endpoint: string,
  body?: any,
  options?: AxiosRequestConfig,
  method?: string
) => {
  // console.log(BACKEND_URL);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const authToken = localStorage.getItem('access_token');
  const res = await axios({
    baseURL: BACKEND_URL,
    url: endpoint,
    method: method || 'GET',
    headers: {
      'Authorization': 'Bearer ' + authToken || '',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      // 'X-CSRFToken': readCSRFToken() || '',
    },
    data: body,
    ...options,
  });
  return res;
};
