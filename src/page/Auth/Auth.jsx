import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components/macro';
import SignIn from "./Login";
import Register from "./Register";



const Auth = () => {
    const { user } = useSelector((state) => ({ ...state.user }));
    const [form, setForm] = useState(false) 


    const toggleForm = () => {
        setForm(!form)
    }

    return (
        <Container>
        <div id="logreg-forms">
            <SlideBoard form={form.toString()} >
            
            </SlideBoard> 
            <SignIn user={user} toggleForm={toggleForm}/>
            <Register user={user} toggleForm={toggleForm}/>
        </div>
        </Container>
    );
};

export default Auth;


const Container = styled.div `
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

#logreg-forms {
  display: flex;
  width: 850px;
  height: 500px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  border-radius: 5px;
}

`
const SlideBoard = styled.div `
    width: 50%;
    height: 100%;
    position: absolute;
    background-color: var(--second-color);
    z-index: 99;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    right: 0;
    ${({form}) => form === 'true' ? 'transform: translateX(-100%);' : 'transform: translateX(0%);' 
    }
`
