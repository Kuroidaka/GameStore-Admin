import axiosClient from "./axiosClient"


export const trackingApi = {
    getTrackingList () {
        const url = '/track/get-track-list';
      
        return axiosClient.get(url)
    }
}

