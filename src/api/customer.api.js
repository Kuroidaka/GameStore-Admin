import axiosClient from "./axiosClient"


export const customer = {
    getInfo ({name, value}) {
        const url = `/customer/getInfo?${name}=${value}`;

        return axiosClient.post(url)
    },
    getList () {
        const url = '/customer/get-list-user'

        return axiosClient.get(url)
    },
    create (data) {
        const url = `/customer/create`;
        const token = localStorage.getItem('token');

        return axiosClient.post(url, data, {
            headers: {
              'authorization': `${token}` 
            }
          })
    },
    update (data, id) {
        const url = `/customer/update?id=${id}`;

        return axiosClient.post(url, data)
    },
    getUserJoinToday () {
        const url = `/customer/get-user-join-today`

        return axiosClient.get(url)
    },
    getUserJoinMonth () {
        const url = `/customer/get-user-join-month`

        return axiosClient.get(url)
    }
}

