import axios from "axios";
// import { getAccessToken } from "./AuthService";

const BASE_URL = "http://localhost:5000";

export const Api = {
    getFoodData: async () => {
        const url = `${BASE_URL}/api/jokes/food`;
        const response = await axios.get(url);
        return response.data;
    },

    // async function getCelebrityData() {
    //     const url = `${BASE_URL}/api/jokes/celebrity`;
    //     return axios
    //         .get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` } })
    //         .then(response => response.data);
    // }

    /**
     * Get a user from the backend.
     * @param usr The user to fetch
     */
    getUser: async (usr: string) => {
        const url = `${BASE_URL}/api/user/${usr}`;
        const res = await axios.get(url);
        return res.data;
    },

    /**
     *
     * @param usr The username
     * @param pswd The password
     * @returns True if the login credentials are valid.
     */
    login: async (usr: string, pswd: string) => {
        const url = `${BASE_URL}/api/login?user=${usr}&password=${pswd}`;
        const res = await axios.get(url);
        return res.status === 200;
    }
};
