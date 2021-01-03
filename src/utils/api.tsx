const BASE_URL = "http://192.168.0.41:5000/api";

const fetchWrapper = {
    get: async (url: string, params?: { [key: string]: string }) => {
        let urlString = BASE_URL + url;
        if (params) {
            // add url params if passed any
            urlString += "?";
            for (const key in params) {
                urlString += `${key}=${params[key]}&`;
            }
            urlString = urlString.slice(0, -1); // chop off last "&"
        }
        return await fetch(urlString, { method: "GET" });
    }
};

export const Api = {
    /**
     * Get a user from the backend.
     * @param usr The user to fetch
     */
    getUser: async (usr: string) => {
        const res = await fetchWrapper.get(`/api/user/${usr}`);
        if (!res.ok) {
            // return new Error();
            // TODO: Make an actual error handler
            return {
                error: true,
                msg: "something went wrong :("
            };
        }
        return await res.json();
    },

    /**
     *
     * @param usr The username
     * @param pswd The password
     * @returns True if the login credentials are valid.
     */
    login: async (usr: string, pswd: string) => {
        const params = {
            user: usr,
            password: pswd
        };
        const res = await fetchWrapper.get("/login", params);
        return res.ok;
    }
};
