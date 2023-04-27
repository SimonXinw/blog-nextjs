import axios from 'axios';

let baseURL = '/api';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    console.log(config);
    config.baseURL = baseURL;
    config.timeout = 20000;
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios的get请求
export function get({ url, params = {} }: { url: string; params: any }) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err, '1');
        reject(err);
      });
  });
}

// axios的post请求
export function post({ url, data }: { url: string; data: any }) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default axios;
