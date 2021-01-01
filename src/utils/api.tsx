import axios from "axios";
// import { getAccessToken } from "./AuthService";

const BASE_URL = "http://localhost:5000";

export default {
    getFoodData: async () => {
        const url = `${BASE_URL}/api/jokes/food`;
        return axios.get(url).then(response => response.data);
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
        return axios.get(url).then(res => res.data);
    }
};
