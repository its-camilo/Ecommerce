import { Try } from "expo-router/build/views/Try";
import {ENV} from "../utils"
import {authFetch} from "../lib"

async function getMe(){
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS_ME}`;
        const response = await authFetch(url);
        // const params = {
        //     headers: {
        //         Authorization: 
        //         "Bearer inserte token here",
        //     },
        // };

        // const response = await fetch(url, params);

        if (response.status !== 200) throw response;

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const userCtrl = {
    getMe,
};