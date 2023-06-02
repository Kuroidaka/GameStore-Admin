import axiosClient from "./axiosClient"


export const orderApi = {
    getOrderList () {
        const url = '/order/get';
      
        return axiosClient.get(url)
    },
    getOrderDetail (id) {
        const url = `/order/get-order-detail?orderId=${id}`;
      
        return axiosClient.get(url)
    }
}

