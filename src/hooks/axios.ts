import axios from "axios"

axios.interceptors.request.use(function (config) {
    // console.log(config);
    // console.log(config.headers.common);
    
    const csrfToken = document['cookie'].replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    config.headers.common['X-XSRF-TOKEN'] = csrfToken;

    return config;
});


export default axios;