import { parse } from "@babel/core";
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

async function getAddressById(addressId) {
    try {
        x=parseInt(addressId)-1;
        const filters = `filters[address][id][$eq]=${x}`;
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${filters}`; //da error 404
        const response = await authFetch(url);

        if (response.status !== 200) throw response;
        const result =  await response.json();
        return {...result.data.attributes, id: result.data.id};
    } catch (error) {
        throw error;
    }
}

async function createAddress(userId, data){
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    ...data,
                    user: userId,
                },
            }),
        };

        const response = await authFetch(url, params);

        if (response.status !== 200 && response.status !== 201) throw response;
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const addressCtrl = {
    getAll: getAllAddresses,
    get: getAddressById,
    create: createAddress,
};