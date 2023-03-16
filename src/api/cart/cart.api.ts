import { PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../axiosClient"
import { productModel } from "../product/product.api";

export interface CartModel {
    id?: number,
    Cart_Code?: string,
    Cart_Name?: string,
    Cart_PhoneNumber?: string,
    Cart_Email?: string,
    Cart_Note?: string,
    Customer_Code?: string,
    Cart_MethodPay? :string,
    Product_List?: CartDetailModel[],
    Status?: string,
}

export interface CartDetailModel {
    id?: number,
    Product_Code?: string,
}

export const CartApi = {

    create: (data: CartModel) => {
        const url = '/Cart/create'

        return axiosClient.post<CartModel>(url, data)
    },
    update: (data: CartModel) => {
        const url = '/Cart/update'

        return axiosClient.post(url, data)
    },
    search: (data: CartModel | any) => {
        const url = '/Cart/search'

        return axiosClient.post(url, data)
    },
    delete: (id: number) => {
        const url = `/Cart/delete/${id}`
        return axiosClient.get(url)
    },
    getById: (id: number) => {
        const url = `/Cart/getById/${id}`
        return axiosClient.get(url)
    },

}