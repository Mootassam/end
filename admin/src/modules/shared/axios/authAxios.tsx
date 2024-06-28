import { AuthToken } from 'src/modules/auth/authToken';
import Axios from 'axios';
// import config from 'src/config';
import { getLanguageCode } from 'src/i18n';
import Qs from 'qs';
import moment from 'moment';

const authAxios = Axios.create({
  // Louis link
  // baseURL: 'http://139.162.155.71:8080/api',

  // richie Link
  // baseURL: "http://139.162.162.106:8080/api",

  // end Link
  // baseURL: 'http://172.104.141.32:8080/api',

  //Blade
  baseURL: 'http://139.162.166.136:8080/api',

  //Local link
  // baseURL: 'http://192.168.1.43:8080/api',

  paramsSerializer: function (params) {
    return Qs.stringify(params, {
      arrayFormat: 'brackets',
      filter: (prefix, value) => {
        if (
          moment.isMoment(value) ||
          value instanceof Date
        ) {
          return value.toISOString();
        }
        return value;
      },
    });
  },
});

authAxios.interceptors.request.use(
  async function (options) {
    const token = AuthToken.get();
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    options.headers['ngrok-skip-browser-warning'] = 'true';
    options.headers['Accept-Language'] = getLanguageCode();
    return options;
  },
  function (error) {
    console.log('Request error: ', error);
    return Promise.reject(error);
  },
);

export default authAxios;
