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

const Register = (props) => {
  const { user, toggleForm } = props

  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

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
       <InputField 
        type="password"
        name="passwordConfirm"
        placeholder={data.passwordConfirm}
        value={passwordConfirm}
        onChange={handleChange}
        required
      />

      <Action>
        <Button title='Sign in' active={true} width='250px'/>
      </Action>
    </form>
      <Action>
        <Button title='Sign up New Account' normal={true} width='250px' onClick={toggleForm}/>
      </Action>
  </RegisterForm>
  )
}

const data = {
  email: "Email Address",
  displayName: "Your full name",
  password: "Your password",
  passwordConfirm: "Confirm your password",
  button1: "",
  
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