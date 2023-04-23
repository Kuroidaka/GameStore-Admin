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



const SignIn = (props) => {
  const { user, toggleForm } = props 

  const [state, setState] = useState({
    email: "",
    password: "",
  });

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

  return (
    <SignInForm>
    <Logo>
      <h1>LOGO</h1>
    </Logo>

    <form onSubmit={handleSubmit}>
      <InputField 
        type="email"
        name="email"
        placeholder="Email address"
        value={email}
        onChange={handleChange}
        required
        errorState={false}
        errorText="input your email"
      />

      <InputField 
        type="password"
        name="password"
        placeholder="Password"
        value={password}
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