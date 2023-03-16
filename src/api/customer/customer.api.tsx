import { PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../axiosClient"

export interface CustomerModel {
    id?: number,
    Customer_Code?: string,
    Customer_Name?: string,
    Customer_Phone?: string,
    Customer_Email?: string,
    Status?: string,
}



export const CustomerApi = {

    create: (data: CustomerModel) => {
        const url = '/Customer/create'

        return axiosClient.post<CustomerModel>(url, data)
    },
    update: (data: CustomerModel) => {
        const url = '/Customer/update'

        return axiosClient.post(url, data)
    },
    search: (data: CustomerModel | any) => {
        const url = '/Customer/search'

        return axiosClient.post(url, data)
    },
    delete: (id: number) => {
        const url = `/Customer/delete/${id}`
        return axiosClient.get(url)
    },
    getById: (id: number) => {
        const url = `/Customer/getById/${id}`
        return axiosClient.get(url)
    },

}