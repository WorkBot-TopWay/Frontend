import axios from 'axios';

export default axios.create({
  baseURL: 'https://topway-api.azurewebsites.net/api/v1',
  //baseURL: 'https://localhost:7197/api/v1',
  herders: { 'Content-Type': 'application/json' }
});