import { useNavigate } from "react-router";
import { auth } from "~/api/auth.api";
import config from "~/config";

const { createContext, useState, useEffect } = require("react");

const AuthContext = createContext()

export const AuthProvider = (props) => {

    const { children } = props
    const [token, setToken] = useState(localStorage.getItem('token') || null)

    const navigate = useNavigate()
    const { auth:authRoute } = config.adminRoutePath 


    useEffect(() => {
        const getToken = () => {
            const token = localStorage.getItem('token')
            setToken(token)
        }
        getToken()
    },[])

    useEffect(() => {
        const checkToken = () => {
            token && auth.checkToken(`${token}`)
            .then(({data}) => {
                console.log(data)

                if(!data.valid) {
                    logOut()
                }

            }).catch(err => {
                console.log(err)
            })  
        }

        checkToken()
    }, [token]);

    const logOut = () => {
        localStorage.removeItem('token')
        navigate(authRoute)
    }

    return (
        <AuthContext.Provider value={{token, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext