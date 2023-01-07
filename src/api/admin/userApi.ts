import axiosClient from "../axiosClient"

export interface userApiType{
   id: number
}   

interface searchType {
    User_Account_Name: string
}


export const userApi = {

    getUserById: (id:number, token: string) => {
        const url = `/user/getById/${id}`

        const config = {
            headers: {
                Authorization: 'Bearer ' + token
              }
        }
        
        return axiosClient.get(url, config)
    },
    
    search: (data:searchType) => {
        const url = '/user/search'
        
        return axiosClient.post(url, {data})
    },
    delete: (ids:Number, token: string) => {
        const url = '/user/delete'

        const config = {
            headers: {
                Authorization: 'Bearer ' + token
              }
        }

        return axiosClient.post(url, {ids}, config)
    }
   

}