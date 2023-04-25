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
import isEmpty from "validator/lib/isEmpty"


const Register = (props) => {
  const { user, toggleForm } = props

  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  
  const [ validationMsg, setValidationMsg ] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const { displayName, email, password, passwordConfirm } = state;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return;
    }
    dispatch(registerInitiate(email, password, displayName));
    setState({ displayName: "", email: "", password: "", passwordConfirm: "" });
  };
  
  const validateAll = () => {
    const msg = {}
    if (isEmpty(email)) {
      msg.email = "Please input your email address"
    } 

    if (isEmpty(password)) {
      msg.password = "Please enter your password"
    }
    
    if (isEmpty(displayName)) {
      msg.displayName = "Please enter your displayName"
    }

    setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
  }

  return (
    <RegisterForm>
    <Logo>
      <h1>LOGO</h1>
    </Logo>

    <form onSubmit={handleSubmit}>

      <InputField 
        type="email"
        name="email"
        placeholder={data.email}
        value={email}
        onChange={handleChange}
        required
      />
       <InputField 
        type="text"
        name="displayName"
        placeholder={data.displayName}
        value={displayName}
        onChange={handleChange}
        required
      />
       <InputField 
        type="password"
        name="password"
        placeholder={data.password}
        value={password}
        onChange={handleChange}
        required
      />
       <div>
          <InputField 
        type="password"
        name="passwordConfirm"
        placeholder={data.passwordConfirm}
        value={passwordConfirm}
        onChange={handleChange}
        required
      />
      <p className="text-red-400 text-xs italic">{validationMsg.diplayName}</p>
       </ div>

      <Action>
        <Button title={data.button1} active={true} width='250px'/>
      </Action>
    </form>
      <Action>
        <Button title={data.button2} normal={true} width='250px' onClick={toggleForm}/>
      </Action>
  </RegisterForm>
  )
}

const data = {
  email: "Email Address",
  displayName: "Your full name",
  password: "Your password",
  passwordConfirm: "Confirm your password",
  button1: "Next",
  button2: "Already have account"
}

export default Register;

const Logo = styled.div `

`

const RegisterForm = styled.div `
  width: 50%;
  max-width: 410px;
  padding: 40px 40px 10px 40px;


`

const Action = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
