import axiosClient from "../axiosClient";

export interface CartModel {
    id?: number,
    Cart_Code?: string,
    Cart_Name?: string,
    Cart_PhoneNumber?: string,
    Cart_Email?: string,
    Cart_Note?: string,
    Customer_Code?: string,
    Cart_MethodPay? :string,
    Cart_Amount?: number,
    Address?: string,
    Product_List?: CartDetailModel[],
    CartDetails? :CartDetailModel[],
    Status?: string,
}

export interface CartDetailModel {
    id?: number,
    key?: number,
    Cart_Detail_Product?: string,
    Cart_Detail_Amount?: string,
    Cart_Detail_Price?: string,
    Cart_Detail_Quantity?: number | null,

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