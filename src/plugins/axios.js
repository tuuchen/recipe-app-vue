import axios from 'axios'

const AXIOS = axios.create({
    baseURL: `/api`,
    timeout: 1000
});

export default {
    getRequest () {
        return AXIOS.get(`/request`);
    },
}