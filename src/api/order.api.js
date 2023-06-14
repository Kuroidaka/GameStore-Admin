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
    }
}

