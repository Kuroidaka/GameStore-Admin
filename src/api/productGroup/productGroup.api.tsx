
import axiosClient from "../axiosClient"

export interface productGroupModel {
    id?: number,
    Product_Group_Code?: string,
    Product_Group_Name?: string,
    Status?: string,
}



export const productGroupApi = {

    create: (data: productGroupModel) => {
        const url = '/productGroup/create'

        return axiosClient.post<productGroupModel>(url, data)
    },
    update: (data: productGroupModel) => {
        const url = '/productGroup/update'

        return axiosClient.post(url, data)
    },
    search: (data: productGroupModel | any) => {
        const url = '/productGroup/search'

        return axiosClient.post(url, data)
    },
    delete: (id: number) => {
        const url = `/productGroup/delete/${id}`
        return axiosClient.get(url)
    },
    getById: (id: number) => {
        const url = `/productGroup/getById/${id}`
        return axiosClient.get(url)
    },

}