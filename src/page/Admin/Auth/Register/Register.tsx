import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { icon } from "~/assert/icon";
import { ToastContainer, toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

import config from "~/config";
import InputInfo from "./Component/infoUser";
import { adminApi } from '~/api/admin/authApi'
import { AxiosResponse } from "axios";
import { User } from "~/model/User.model";
interface RegisterProps {

}

interface registerResponse extends User {
    msg: string 
}

const toastOption = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

const Register:FC<RegisterProps> = () => {

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordCF, setPasswordCF] = useState<string>('')
    const [inputModal, setInputModal] = useState<Boolean>(false)
    const [load, setLoad] = useState<Boolean>(false)
    const notify = useRef<any>(null)
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    const toastLoading = () => {
        if(!toast.isActive(notify.current)) notify.current = toast.loading('Logging')
        else toast.update(notify.current, { render: 'Logging', isLoading: true})
    }
    // const toastError = () => toast.update(notify.current, { render: 'Error', type: "error", isLoading: false, ...toastOption})
    const toastSuccess = () => toast.update(notify.current, { render: 'Successful', type: "success", isLoading: false, ...toastOption})


    
        

    const handleRegister = (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoad(true)
        if(password !== passwordCF) {
            setLoad(false)
            return toast.error('Error', toastOption)
        }
        else {

            const data = {  
                User_Account_Name: username,
                User_Account_Password: password,
                User_Account_Permission: 'Admin',
                Status: 'Offline'
            }
            
            adminApi.register(data)
            .then((res:AxiosResponse<registerResponse>) => {
                setLoad(false)
                toastSuccess()
                setInputModal(true) 
            })
        }
    }

    useEffect(() => {
        load && toastLoading()
    }, [load])


    return ( 
    <Container>
        {inputModal && <InputInfo setInputModal={setInputModal}/>}


       <div className="wrapper">
            <form className="register-form" onSubmit={handleRegister}>
                <div className="header">
                    <h1>CREATE ACCOUNT</h1>
                </div>

                <div className="form-body">

                    <div className="input-bar">
                        <input type="text" onInput={(e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} value={username} placeholder="Username?"/>
                    </div>

                    <div className="input-bar">
                        <input type="email" onInput={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) } value={email} placeholder="Email or username"/>
                    </div>

                    <div className="input-bar">
                        <input type="password" onInput={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value) } value={password} placeholder="Password"/>
                    </div>

                    <div className="input-bar">
                        <input type="password" onInput={(e:ChangeEvent<HTMLInputElement>) => setPasswordCF(e.target.value)} value={passwordCF} placeholder="Password Confirm"/>
                    </div>

                    <Button>CREATE ACCOUNT</Button>

                    <div className="ask">
                        <p>Already have account ? </p>
                        <Link to={config.adminRoutePath.login}>LOGIN</Link>
                    </div>
                </div>
                <div className="link">

                    <div className="icon fb">
                        <icon.facebook />
                    </div>

                    <div className="icon gg">
                        <icon.google/>
                    </div>
                    
                </div>
            </form>
       </div>


       <ToastContainer />
    </Container>
    );
}
 
export default Register;

const Container = styled.div`
width: 100vw;
height: 100vh;

display: flex;
justify-content: center;
align-items: center;

    .wrapper{
        max-width: calc(100vw - 20px);
        width: 450px;
        
        .register-form {
            
            box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px ;
            max-width: 450px;
            width: 100%;

            padding: 30px;

            .header{
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .form-body{
                width: 100%;
                
                .input-bar{
                    height: 56px;
                    width: 100%;
                    background-color: #F4F4F4;

                    input {
                        width: 100%;
                        height: 100%;
                        padding: 20px;
                        background-color: transparent;
                        border: none;
                        outline: none;
                    }

                    &.input-bar{
                        margin-top: 20px;
                    }
                }
                
                .keep{
                    margin-top: 17px;
                    input {
                    }
                    label {
                        margin-left: 7px;
                    }
                }

                .ask{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    margin-top: 10px;
                    
                    a{

                    }
                }
            }

            .link {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 25px;
                gap: 14px;

                .icon{
                    background-color: #6666a8;
                    border-radius: 999px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50px;
                    height: 50px;
                    color: #F4F4F4;
                    cursor: pointer;

                    &.gg{
                        font-size: 25px;
                        background-color: #DE4B39;
                        
                    }

                    &.fb{
                        background-color: #3C5997;
                    }
                }
            }

        }
    }

`

const Button = styled.button`
    margin-top: 20px;
    border: none;
    width: 100%;
    height: 44px;
    background-color: var(--third_admin);
    cursor: pointer;
    color: #FAFAFA;
`