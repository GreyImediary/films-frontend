import axios from "axios";
import qs from "qs";

export default {
    __host__: process.env.VUE_APP_API_URL.endsWith("/") ? process.env.VUE_APP_API_URL : process.env.VUE_APP_API_URL + "/",

    async execute(method, path, params = {}) {
        const headers = {
            'Content-Type': "application/json",
            Accept: 'application/json',
            'x-requested-with': 'XMLHttpRequest',
        }

        const request = {
            method: method,
            url: this.__host__ + 'api/' + path,
            headers: headers,
            paramsSerializer: params => {
                return qs.stringify(params);
            },
        };

        if (method === 'get') {
            request.params = params;
        } else {
            request.data = params;
        }

        try {
            const response = await axios(request);

            return {
                status: response.status,
                headers: response.headers,
                body: response.data,
            };
        } catch (e) {
            if (e.response.status >= 300 && e.response.status < 400) {
                return {
                    status: e.response.status,
                    headers: e.response.headers,
                    body: e.response.data,
                };
            }

            throw e;
        }
    }
}