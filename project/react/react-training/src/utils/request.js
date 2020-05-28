import axios from 'axios';
import { toast } from 'react-semantic-toasts';

// create an axios instance
const service = axios.create({
  baseURL: '/api',
  timeout: 5000, // request timeout
});

// response interceptor
export const axiosInterceptors = () => {
  service.interceptors.response.use(
    (response) => {
      if (response.status !== 200) {
        return Promise.reject(response);
      }

      const res = response.data;

      if (res.result !== 'ok') {
        toast({
          type: 'error',
          title: 'Error',
          description: 'Result error',
          time: 5000,
        });
        return Promise.reject(new Error('Error'));
      }
      return res;
    },
    (error) => {
      console.log(`err${error}`); // for debug

      toast({
        type: 'error',
        title: 'Error',
        description: error.message,
        time: 5000,
      });

      return Promise.reject(error);
    },
  );
};
axiosInterceptors();

export default service;
