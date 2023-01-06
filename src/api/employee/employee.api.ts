import axiosClient from "../axiosClient"

export interface employeeApi {
    id?:number,
    Employee_Name?: string,
    Employee_Phone?: string,
    Employee_CI?: string,
    Employee_Email?: string,
    Employee_Avatar?: string,
    Employee_BirthDay?: Date,
    Status?: string,
}




export const employeeApi = {

    create: (data:employeeApi) => {
        const url = 'employee/create'
        
        return axiosClient.post<employeeApi>(url, data)
    },
    update: (data:employeeApi) => {
        const url = 'employee/update'
        
        return axiosClient.post(url, data)
    },
    search: (data:employeeApi) => {
        const url = 'employee/search'
        
        return axiosClient.post(url, data)
    },
     delete: (id:number) => {
        const url = `employee/delete/${id}`
        return axiosClient.get(url)
    },
   getById: (id:number) => {
        const url = `employee/getById/${id}`
        return axiosClient.get(url)
    },

}