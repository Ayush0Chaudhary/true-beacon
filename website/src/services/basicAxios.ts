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
  const BACKEND_URL = 'http://localhost:3000';
  // const authToken = global.localStorage.getItem('S3X_N1_M1!3_CA');
  const res = await axios({
    baseURL: BACKEND_URL,
    url: endpoint,
    method: method || 'GET',
    // headers: {
    //   'Authorization': 'dcoinsd23423k4b23jk4nk23jb4jk23b4ij23lsads3242dfs34esk ' + authToken || '',
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Credentials': true,
    //   // 'X-CSRFToken': readCSRFToken() || '',
    // },
    data: body,
    ...options,
  });
  return res;
};
