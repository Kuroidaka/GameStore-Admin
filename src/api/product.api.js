

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
    insertGameImage (data, id) {
        const url = `file/image/game/?gameID=${id}`

        return axiosClient.post(url, data,  {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    getCountGame () {
        const url = `/game/get-count-game`

        return axiosClient.get(url)
    },
    editGame (data, id) {
        const url = `/game/edit?id=${id}`

        const token = localStorage.getItem('token');

        return axiosClient.post(url, data, {
            headers: {
                'authorization': `${token}` 
            }
        })
    }

}

