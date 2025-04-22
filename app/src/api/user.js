import { Try } from "expo-router/build/views/Try";
import {ENV} from "../utils"

async function getMe(){
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS_ME}`;
        const params = {
            headers: {
                Authorization: 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzQ1Mjg2ODIxLCJleHAiOjE3NDc4Nzg4MjF9.oRxwbU55xux4nGxd0GKmMqDtuqm71Tvi7ZD9RnM1xog",
            },
        };

        const response = await fetch(url, params);

        if (response.status !== 200) throw response;

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const userCtrl = {
    getMe,
};