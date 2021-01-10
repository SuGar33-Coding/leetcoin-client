const BASE_URL = "http://localhost:3000/api";

const customFetch = async (
    method: string,
    url: string,
    params?: { [key: string]: string | number }
) => {
    let urlString = BASE_URL + url;
    if (params) {
        // add url params if passed any
        urlString += "?";
        for (const key in params) {
            urlString += `${key}=${params[key]}&`;
        }
        urlString = urlString.slice(0, -1); // chop off last "&"
    }
    return await fetch(urlString, { method });
};

const fetchWrapper = {
    get: async (url: string, params?: { [key: string]: string | number }) =>
        await customFetch("GET", url, params),
    post: async (url: string, params?: { [key: string]: string | number }) =>
        await customFetch("POST", url, params),
    put: async (url: string, params?: { [key: string]: string | number }) =>
        await customFetch("PUT", url, params)
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
    },

    makeTransaction: async (name: string, amt: number) => {
        const params = {
            name,
            amt
        };
        const res = await fetchWrapper.post("/user/transaction", params);

        return res.ok;
    },

    getUser: async (name: string) => {
        const params = {
            name
        };

        const res = await fetchWrapper.get("/user", params);

        if (!res.ok) {
            throw new Error("Not found");
        }

        return await res.json();
    }
};
