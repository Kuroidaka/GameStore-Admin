import axios from "axios";
import { API_BASE_URL } from "~/config/api";


const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

axiosClient.interceptors.request.use(async config => {
    return config;
  },
  error => {
    Promise.reject(error)
})

axiosClient.interceptors.response.use((res) => {
    if( res && res.data ){
        return res
    }

    return res
}, error => {
    
    // throw error
    console.log(error.response);
    
    return error.response
})

export default axiosClient