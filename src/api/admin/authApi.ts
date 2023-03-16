import axiosClient from "../axiosClient"

export interface registerApi{
    User_Account_Name: string,
    User_Account_Password: string,
    // User_Account_Email: string,
    User_Account_Permission: string
}   

export interface loginApi{
    User_Account_Name: string,
    User_Account_Password: string,
}   


export const adminApi = {

    register: (data:registerApi) => {
        const url = '/user/register'
        
        return axiosClient.post(url, data)
    },
    login:(data:loginApi) => {
        const url = '/user/login'
        
        return axiosClient.post(url, data)
    },

    logout:() => {
        const url = '/user/logout'
        
        return axiosClient.get(url)
    },

    refreshToken:() => {
        const url = '/user/refreshToken'
        return axiosClient.get(url)
    },

    getUserInfor: () => {
        const url = '/user/getUserInformation'
        
        return axiosClient.get(url)
    }
}