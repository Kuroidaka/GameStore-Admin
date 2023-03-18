
import axiosClient from "../axiosClient"

export interface reportModel {
    id?: number,
    Report_Time?: Date,
    Report_Value?: number
}

export interface searchReportModel {
    Report_Type?: string,
    Report_Time?: any[],
}

export const reportApi = {

    revenueReport: (data: searchReportModel) => {
        const url = '/report/revenueReport'

        return axiosClient.post(url, data)
    },
  

}