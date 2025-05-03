import { authFetch } from "../lib";
import {ENV} from "../utils";

async function getAllAddresses(userId) {
    try {
        const filters = `filters[user][id][$eq]=${userId}`;
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}?${filters}`;

        const response = await authFetch(url);

        if (response.status !== 200) throw response;
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const addressCtrl = {
    getAll: getAllAddresses,
};