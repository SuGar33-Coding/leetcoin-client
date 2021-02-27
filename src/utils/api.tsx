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
	let resBody: any;
	try {
		resBody = await res.json();
	} catch (error) {
		resBody = {
			status: res.status
		};
	}

	if (!res.ok) {
		const errMsg = resBody.error
			? resBody.error.message
			: `There was an error. Status: ${res.status}`;
		console.error(resBody);
		throw new Error(errMsg);
	}
	return resBody;
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
		await fetchWrapper.get("/login", params);
	},

	createAccount: async (name: string, password: string) => {
		const params = {
			name,
			password
		};

		const res = await fetchWrapper.post("/user", params);

		return await res;
	},

	getUserBalance: async (name: string, password: string) => {
		const params = {
			name,
			password
		};

		const res = await fetchWrapper.get("/wallet/balance", params);

		return res.balance as number;
	},

	makeTransaction: async (name: string, amt: number) => {
		const params = {
			name,
			amt
		};

		await fetchWrapper.post("/wallet/transaction", params);
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

		await fetchWrapper.post("/wallet/transfer", params);
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

		await fetchWrapper.post("/wallet/payment", params);
	},

	makeEarnings: async (name: string, amt: number, type: string) => {
		const params = {
			name,
			amt,
			type
		};

		await fetchWrapper.post("/wallet/earnings", params);
	},

	getUser: async (name: string) => {
		const params = {
			name
		};

		return await fetchWrapper.get("/user", params);
	},

	queryUsers: async () => {
		return await fetchWrapper.get("/users");
	},

	queryTransactions: async (limit: number) => {
		const params = {
			limit
		};

		return await fetchWrapper.get("/transactions", params);
	}
};
