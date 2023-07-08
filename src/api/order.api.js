import axiosClient from "./axiosClient"


export const orderApi = {
    getOrderList () {
        const url = '/order/get';
      
        return axiosClient.get(url)
    },
    getOrderDetail (id) {
        const url = `/order/get-order-detail?orderId=${id}`;
      
        return axiosClient.get(url)
    },
    book (data) {
        const url = `/order/book`;
        const token = localStorage.getItem('token');
    
        return axiosClient.post(url, data, {
            headers: {
                'authorization': `${token}` 
              }
        })
    },
    editOrder (data, query) {
        const {status, id} = query;
        const url = `/order/edit-order-detail?queue_status=${status}&orderId=${id}`;
        const token = localStorage.getItem('token');
    
        return axiosClient.post(url, data, {
            headers: {
                'authorization': `${token}` 
              }
        })

    },
    getOrderListByGameID (id) {
        const url = `/order/get-order-by-game?id=${id}`;
      
        return axiosClient.get(url)
    },
    getTotalRevenue () {
        const url = '/order/get-total-revenue'

        return axiosClient.get(url)
    }
}

