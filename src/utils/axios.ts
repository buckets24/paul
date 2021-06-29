import anylogger from 'anylogger';
import axios from 'axios';

const API_BASE_PATH = '';
const log = anylogger('axios utils');

log.debug('API_BASE_PATH', API_BASE_PATH);

axios.defaults.baseURL = API_BASE_PATH;
let isTokenRegistered = false;

export function registerAuthInterceptor(token?: string): void {
  if (!isTokenRegistered) {
    axios.interceptors.request.use(
      (config) => {
        if (token) {
          isTokenRegistered = true;
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        void Promise.reject(error);
      }
    );
  }
}

export default axios;
