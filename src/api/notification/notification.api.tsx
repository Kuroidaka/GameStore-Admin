import axiosClient from "../axiosClient"



export const notifyApi = {

    create: (data: any) => {
        const url = '/notification/create'
        return axiosClient.post(url, data)
    },

    search: (data: any) => {
        const url = '/notification/search'
        return axiosClient.post(url, data)
    },

}