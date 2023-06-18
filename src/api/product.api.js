

import axiosClient from "./axiosClient"


export const productApi = {
    getProductOrderDummy () {
        const url = 'https://dummyjson.com/products';
      
        return axiosClient.get(url)
    },
    getProductByName (name) { 
        const url = `/game/getByName?name=${name}`;
        
        return axiosClient.get(url)
    },
    getProduct () {
        const url= `/game/get`

        return axiosClient.get(url)
    },
    getProductById (id) {
        const url= `/game/getById?id=${id}`

        return axiosClient.get(url)
    },
}

