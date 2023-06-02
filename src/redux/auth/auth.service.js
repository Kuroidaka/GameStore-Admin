import { auth } from "~/api/auth.api"
import { loginSuccess } from "./auth.slice"
import config from "~/config"

const { dashboard } = config.adminRoutePath

export const loginService = async (data, dispatch, navigate) => {
    const res = await auth.login(data)
        
    if(res.status === 200){
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        dispatch(loginSuccess(data))
    }

    return { 
        data : res.data,
        status : res.status
    }
 
}

export const RegisterService = async (data, dispatch, navigate) => {

    const res = await auth.signUp(data)

    if(res.status === 200){
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        console.log(decodeURI(res.data.token));
        dispatch(loginSuccess(data))
    }

    return { 
        data: res.data,
        status: res.status
    };
    


}