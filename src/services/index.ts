import request from './axios';

export const getCraw = (params: any) => {
  const url = '/craw';
  return request({ url, params });
};

export const creatUser = (params: any) => {
  const url = '/user';
  return request({ url, method: 'POST', params });
};
