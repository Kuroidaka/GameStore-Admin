import axiosClient from "./axiosClient"


export const auth = {
    getListAdmin (data) {
        const url = '/admin/signup';

        return axiosClient.post(url, data)
    }
}

