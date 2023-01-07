export interface User {
    User_Account_Name?: '' | null
    User_Account_Password?: string | null
    User_Account_Permission?: string | null
    createdAt?: Date | null
    id?: number | null
    updatedAt?: string | null
    Status?: string 
    
}

export interface UserToken {
    User_Account_Name: string
    User_Account_Permission: string
    createdAt: string
    exp: number
    iat: number
    id: number
    updatedAt: string
}