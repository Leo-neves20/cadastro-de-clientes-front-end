import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5173/',
    timeout: 2000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default instance