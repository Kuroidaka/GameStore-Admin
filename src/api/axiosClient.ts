import axios from "axios";


const axiosClient = axios.create({
    baseURL: 'http://localhost:8888/api/v1',
    headers: {
        'content-type': 'application/json'
    }
})

axiosClient.interceptors.request.use(async config => {
    return config;
  },
  error => {
    Promise.reject(error)
})

axiosClient.interceptors.response.use(res => {
    if( res && res.data ){
        return res.data
    }

    return res
}, error => {
    //handle error
    throw error
})

export default axiosClient