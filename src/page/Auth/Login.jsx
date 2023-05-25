import Button from "~/component/Button";
import InputField from "~/component/InputField";
import { loginService } from "~/redux/auth/auth.service";
import config from "~/config";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

//use npm install validator to validation input
import isEmpty from "validator/lib/isEmpty"



const SignIn = (props) => {
  const { user, toggleForm } = props 
  
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  
  const [ validationMsg, setValidationMsg ] = useState('')

  const { username, password } = state;

  const { dashboard } = config.adminRoutePath

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleInput = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  
  //Validate input 
  const validateAll = () => {
    const msg = {}
    if (isEmpty(username)) {
      msg.username = "Please input your username address"
    } 

    if (isEmpty(password)) {
      msg.password = "Please enter your password"
    }

    setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
  }
  
  const onSubmitLogin = async (e) => {
    e.preventDefault()
    const isValid = validateAll()
    if (!isValid) return 
    //Call API Login
    const { status, data } = await loginService({username, password}, dispatch, navigate)
    const { msg } = data
    // validate response status
    switch (status) {
      case 200:
        navigate(dashboard)
        break;
      case 401:
        setValidationMsg({password : msg})
        break;
      case 404:
        setValidationMsg({username : msg})
        break;
      default:
    }
  } 

  return (
    <SignInForm>
    <Logo>
      <h1>LOGO</h1>
    </Logo>

    <form onSubmit={onSubmitLogin}>
          <InputField
            type="username"
            id="inputUsername"
            className="form-control"
            placeholder={data.username}
            value={username}
            name="username"
            onInput={handleInput}
            errorText={validationMsg.username}
            errorState={validationMsg.username !== '' && validationMsg.username !== undefined ? true : false}
            setError={setValidationMsg}
          />
          <InputField 
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder={data.password}
            value={password}
            name="password"
            onInput={handleInput}
            errorText={validationMsg.password}
            errorState={validationMsg.password !== '' && validationMsg.password !== undefined ? true : false}
            setError={setValidationMsg}
          />

      <Action>
        <Button title='Sign in' active={true} width='250px'/>
      </Action>
    </form>
      <Action>
        <Button title='Sign up New Account' normal={true} width='250px' onClick={toggleForm}/>
      </Action>
  </SignInForm>
  )
}

const data = {
  username: 'Username',
  password: 'Input Password',
  error: 'Password or Username is incorrect',
}


export default SignIn;


const Logo = styled.div `

`


const SignInForm = styled.div`
  width: 50%;
  max-width: 410px;
  padding: 40px 40px 10px 40px;

  form {
    margin-top: 74px;
  }

`

const Action = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
