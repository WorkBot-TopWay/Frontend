import axios from 'axios';

export default axios.create({
  baseURL: 'https://topway-api.azurewebsites.net/api/v1',
  herders: { 'Content-Type': 'application/json' }
});