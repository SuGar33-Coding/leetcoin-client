const storeKeys = {
	NAME: "name",
	PASSWORD: "pass",
	BALANCE: "balance"
};

export const Local = {
	isLoggedIn: () => {
		return Local.getName() !== null && Local.getPass() !== null;
	},
	getName: () => {
		return localStorage.getItem(storeKeys.NAME);
	},
	setName: (name: string) => {
		localStorage.setItem(storeKeys.NAME, name);
	},
	getPass: () => {
		return localStorage.getItem(storeKeys.PASSWORD);
	},
	setPass: (pass: string) => {
		localStorage.setItem(storeKeys.PASSWORD, pass);
	},
	getBalance: () => {
		const balance = localStorage.getItem(storeKeys.BALANCE);
		return balance ? parseFloat(balance) : 0;
	},
	setBalance: (balance: number) => {
		localStorage.setItem(storeKeys.BALANCE, balance.toString());
	},
	/**
	 * Clears all data in local storage.
	 */
	clear: () => {
		localStorage.clear();
	}
};
