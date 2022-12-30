import { ChangeEvent, FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaFacebookF } from 'react-icons/fa'
import { AiOutlineGooglePlus } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import config from '~/config'
import { img } from "~/assert/img";
import { adminApi } from "~/api/admin/authApi";



const toastOption = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}


interface LoginProps {

}

const Login:FC<LoginProps> = () => {

    const [username, setUsername]= useState<string>('')
    const [password, setPassword]= useState<string>('')

    const handleLogin = (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            User_Account_Name: username,
            User_Account_Password: password
        }
        adminApi.login(data)
        .then(res => {
            console.log(res);
        })
        .catch(() => {
            toast.error('Wrong Password or username', toastOption)

        }) 
    }

    useEffect(() => {

    }, [])

    return ( 
    <Container>
       <div className="wrapper">
            <form className="login-form" onSubmit={handleLogin}>
                <div className="header">
                    <img src={img.logo} alt="" />
                </div>

                <div className="form-body" >
                    <div className="input-bar">
                        <input type="text" placeholder="Email or username"
                            value={username} onInput={(e:ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}}/>
                    </div>

                    <div className="input-bar">
                        <input type="password" placeholder="Password"
                        value={password} onInput={(e:ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}}/>
                    </div>

                    <div className="keep">
                        <input type="checkbox" name="" id="keep-me" />
                        <label htmlFor="keep-me">Keep me logged in</label>
                    </div>

                    <Button>LOG IN</Button>

                    <div className="ask">
                        <p>Do not have account already ? </p>
                        <Link to={config.adminRoutePath.register}>REGISTER</Link>
                    </div>
                </div>
                <div className="link">

                    <div className="icon fb">
                        <FaFacebookF />
                    </div>

                    <div className="icon gg">
                        <AiOutlineGooglePlus/>
                    </div>
                    
                </div>
            </form>
       </div>

       <ToastContainer/>

    </Container>
    );
}
 
export default Login;

const Container = styled.div`
width: 100vw;
height: 100vh;

display: flex;
justify-content: center;
align-items: center;

    .wrapper{
        max-width: calc(100vw - 20px);
        width: 450px;
        height: auto;

        .login-form {
            
            box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px ;
            width: 100%;
            padding: 30px;

            .header{
                height: 90px;
                display: flex;
                justify-content: center;
                align-items: center;

                img{
                    height: 100%;
                }
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
                margin-top: 40px;
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