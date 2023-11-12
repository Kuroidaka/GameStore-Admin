import axiosClient from "./axiosClient"


export const discountAPI = {
    getListDiscount () {
        const url = `/discount/get-list-discount`;

        return axiosClient.get(url)
    },
}

