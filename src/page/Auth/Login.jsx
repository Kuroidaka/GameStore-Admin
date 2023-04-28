import React, { useState, useEffect } from "react";
import {
  loginInitiate,
  registerInitiate,
} from "~/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputField from "~/component/InputField";
import Button from "~/component/Button";
//use npm install validator to validation input
import isEmpty from "validator/lib/isEmpty"



const SignIn = (props) => {
  const { user, toggleForm } = props 
  const msg = {}
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  
  const [ validationMsg, setValidationMsg ] = useState('')

  const { username, password } = state;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleInput = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginInitiate(username, password));
    setState({ username: "", password: "" });
  };
  
  //Validate input 
  const validateAll = () => {
    
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
  
  const onSubmitLogin = (e) => {
    e.preventDefault()
    const isValid = validateAll()
    if (!isValid) return 
    //Call API Login
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
