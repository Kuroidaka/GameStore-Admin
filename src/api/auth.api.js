import axiosClient from "./axiosClient"


export const auth = {
    signUp (data) {
        const url = '/admin/signup';

        return axiosClient.post(url, data)
    },
    login (data) {
        const url = '/admin/login';

        return axiosClient.post(url, data)
    },
    checkToken(token) {
        const url = '/admin/check-token';

        return axiosClient.post(url, {
            headers: {
                'authorization': token
            }
        })
    }
}

