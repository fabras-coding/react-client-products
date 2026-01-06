import axxios from 'axios';

const api = axxios.create(
    {
        baseURL: 'http://localhost:5041/',
    }
)

export default api;