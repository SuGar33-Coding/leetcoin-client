const BASE_URL = "http://localhost:3000/api";

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
    },
    post: async (url: string, params?: { [key: string]: string }) => {
        let urlString = BASE_URL + url;
        if (params) {
            // add url params if passed any
            urlString += "?";
            for (const key in params) {
                urlString += `${key}=${params[key]}&`;
            }
            urlString = urlString.slice(0, -1); // chop off last "&"
        }
        return await fetch(urlString, { method: "POST" });
    }
};

export const Api = {
    /**
     *
     * @param name The username
     * @param password The password
     * @returns True if the login credentials are valid.
     */
    login: async (name: string, password: string) => {
        const params = {
            name,
            password
        };
        const res = await fetchWrapper.get("/login", params);
        return res.ok;
    },

    createAccount: async (name: string, password: string) => {
        const params = {
            name,
            password
        };
        const res = await fetchWrapper.post("/user", params);
        return res.ok;
    },

    getUserBalance: async (name: string, password: string) => {
        const params = {
            name,
            password
        };
        const res = await fetchWrapper.get("/user/balance", params);

        if (res.ok) {
            return parseFloat(await res.text());
        } else {
            // TODO: Throw error
            return -1;
        }
    }
};
