import { auth } from "~/api/auth.api"
import { loginSuccess } from "./auth.slice"
import config from "~/config"

const { dashboard } = config.adminRoutePath

export const loginService = async (data, dispatch, navigate) => {
    try {
        await auth.login(data).then(res => {

            if(res.status === 200){
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                console.log(decodeURI(res.data.token));
                dispatch(loginSuccess(data))
                navigate(dashboard)
            }

        })

    } catch (error) {
        console.log(error);
    }
    
    
 
}