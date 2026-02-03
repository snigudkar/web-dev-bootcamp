// Axios is just a cleaner and simpler way to make HTTP requests in JavaScript/React
import axios from 'axios';

const API = axios.create({
  
  baseURL: "https://probable-disco-69g6vvpxqp7j2r7vq-5000.app.github.dev", 
  
  withCredentials: true,
});

export default API;
