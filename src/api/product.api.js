

import axiosClient from "./axiosClient"


export const productApi = {
    getProductOrderDummy () {
        const url = 'https://dummyjson.com/products';
      
        return axiosClient.get(url)
    }
}

