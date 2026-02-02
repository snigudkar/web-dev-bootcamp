// Axios is just a cleaner and simpler way to make HTTP requests in JavaScript/React
import axios from 'axios';

const API = axios.create({
  
  baseURL: "https://psychic-space-fortnight-v6p7j5rgqx7gcx9vg-5000.app.github.dev", 
  
  withCredentials: true,
});

export default API;
