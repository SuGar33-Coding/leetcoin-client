const storeKeys = {
    NAME: "name",
    PASSWORD: "pass"
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
    }
};
