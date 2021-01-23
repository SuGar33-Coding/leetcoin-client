// TODO: figure out how to env this
const BASE_URL = `http://${process.env.PREACT_APP_API_BASE_URL}/api`;

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
    const res = await fetch(urlString, { method });
    if (!res.ok) {
        console.error(JSON.stringify(await res.json()));
    }
    return res;
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
        const res = await fetchWrapper.get("/wallet/balance", params);

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
        const res = await fetchWrapper.post("/wallet/transaction", params);

        return res.ok;
    },

    makeTransfer: async (
        sender: string,
        password: string,
        receiver: string,
        amt: number
    ) => {
        const params = {
            sender,
            password,
            receiver,
            amt
        };
        const res = await fetchWrapper.post("/wallet/transfer", params);

        return res.ok;
    },

    makePayment: async (
        name: string,
        password: string,
        amt: number,
        note?: string
    ) => {
        // TODO: Figure out the typing here
        const params: any = {
            name,
            password,
            amt
        };
        if (note) {
            params.note = note;
        }
        const res = await fetchWrapper.post("/wallet/payment", params);

        return res.ok;
    },

    makeEarnings: async (name: string, amt: number, type: string) => {
        const params = {
            name,
            amt,
            type
        };
        const res = await fetchWrapper.post("/wallet/earnings", params);

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
    },

    queryUsers: async () => {
        const res = await fetchWrapper.get("/users");

        return await res.json();
    },

    queryTransactions: async (limit: number) => {
        const params = {
            limit
        };

        const res = await fetchWrapper.get("/transactions", params);

        return await res.json();
    }
};
