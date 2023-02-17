
import axiosClient from "../axiosClient"

export interface productModel {
    id?: number,
    Product_Code?: string,
    Product_Name?: string,
    Product_Group_Code?: string,
    Product_Price?: number,
    Product_Images?: string,
    Product_Detail?: Date,
    Product_Description?: Date,
    Status?: string,
}



export const productApi = {

    create: (data: productModel) => {
        const url = '/product/create'

        return axiosClient.post<productModel>(url, data)
    },
    update: (data: productModel) => {
        const url = '/product/update'

        return axiosClient.post(url, data)
    },
    search: (data: productModel | any) => {
        const url = '/product/search'

        return axiosClient.post(url, data)
    },
    delete: (id: number) => {
        const url = `/product/delete/${id}`
        return axiosClient.get(url)
    },
    getById: (id: number) => {
        const url = `/product/getById/${id}`
        return axiosClient.get(url)
    },

}