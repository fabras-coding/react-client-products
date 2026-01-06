import axios from 'axios';

const authApi = axios.create({
    baseURL: 'http://localhost:5205',
});

export default authApi;