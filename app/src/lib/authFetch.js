import {storageCtrl} from "../api/storage"
import {fn} from "../utils"

export async function authFetch(url, params){
    const token = await storageCtrl.getToken();

    const logout = async () => {
        await storageCtrl.removeToken();
    };

    if (!token){
        logout();
        return Promise.reject("No token found");
    }

    else{
        if (fn.hasTokenExpired(token)){
            logout();
            return Promise.reject("Token expired");
        }
        
        else{
            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                return await fetch(url, paramsTemp);
            } catch (error) {
                throw error;
            }
        }
    }
}