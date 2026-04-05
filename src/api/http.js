import axios from 'axios';

function create(baseUrl, options) {
    const instance = axios.create(Object.assign({ baseURL: baseUrl }, options));
    return instance;
}


// export const canvases = create('https://json-server-vercel-opal-rho.vercel.app/canvases');
export const canvases = create(`${import.meta.env.VITE_API_BASE_URL}/canvases`);
// export const posts = create('http://localhost:8000/posts/');////