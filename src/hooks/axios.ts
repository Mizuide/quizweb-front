import axios from "axios"

axios.interceptors.request.use(function (config) {

    const csrfToken = document['cookie'].replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, '$1');
    config.headers.common['X-XSRF-TOKEN'] = csrfToken;

    return config;
});


export default axios;