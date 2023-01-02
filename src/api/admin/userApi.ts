import axiosClient from "../axiosClient"

export interface userApiType{
   id: number
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
   

}