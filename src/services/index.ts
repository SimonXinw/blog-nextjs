import request from './axios';

export const getCraw = (params) => {
  const url = '/craw';
  return request({ url, params });
};
