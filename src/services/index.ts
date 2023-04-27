import request from './axios';

export const getCraw = (params: any) => {
  const url = '/craw';
  return request({ url, params });
};
