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

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  
  const [ validationMsg, setValidationMsg ] = useState('')

  const { email, password } = state;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginInitiate(email, password));
    setState({ email: "", password: "" });
  };
  
  //Validate input 
  const validateAll = () => {
    const msg = {}
    if (isEmpty(email)) {
      msg.email = "Please input your email address"
    } 

    if (isEmpty(password)) {
      msg.password = "Please enter your password"
    }

    setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
  }
  
  const onSubmitLogin = () => {
    const isValid = validateAll()
    if (!isValid) return 
    //Call API Login
  } 

  return (
    <SignInForm>
    <Logo>
      <h1>LOGO</h1>
    </Logo>

    <form onSubmit={handleSubmit}>
      <div>
          <InputField
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            value={email}
            name="email"
            onChange={handleChange}
            required
          />
          <p className="text-red-400 text-xs italic">{validationMsg.email}</p>
          </div>

       <div>
            <InputField 
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />
          <p className="text-red-400 text-xs italic">{validationMsg.password}</p>
      </div>

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
