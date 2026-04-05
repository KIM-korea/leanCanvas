import axios from 'axios';

function create(baseUrl, options) {
    const instance = axios.create(Object.assign({ baseURL: baseUrl }, options));
    return instance;
}
export const canvases = create('http://localhost:8000/canvases/');
export const posts = create('http://localhost:8000/posts/');////