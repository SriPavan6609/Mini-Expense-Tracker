import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true // for using cookies/session
});

export const getCurrentUser = () => axios.get('/me');
