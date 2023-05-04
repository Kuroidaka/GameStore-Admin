import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import InputField from '~/component/InputField'
import Button from '~/component/Button'
import isEmpty from 'validator/lib/isEmpty'
import equals from 'validator/lib/equals'
import { auth } from '~/api/auth.api'

const Register = (props) => {
  const { user, toggleForm } = props
  const msg = {}
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [validationMsg, setValidationMsg] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const { 
    username,
    email,
    password,
    passwordConfirm
  } = state

  const dispatch = useDispatch()

  const handleInput = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      return
    }
    setState({ username: '', email: '', password: '', passwordConfirm: '' })
  }

  const validateAll = () => {
    if (isEmpty(email)) {
      msg.email = 'Please input your email address'
    }

    if (isEmpty(password)) {
      msg.password = 'Please enter your password'
    }

    if (isEmpty(passwordConfirm)) {
      msg.passwordConfirm = 'Please enter your passwordConfirm'
    }

    if (isEmpty(username)) {
      msg.username = 'Please enter your username'
    }

    if (!equals(passwordConfirm, password)) {
      msg.passwordConfirm = 'Password confirm must match'
    }

    setValidationMsg(msg)
    if (Object.keys(msg).length > 0) return false
    return true
  }

  const onSubmitRegister = (e) => {
    e.preventDefault()
    const isValid = validateAll()
    if (!isValid) {
      return
    }
   
  }

  return (
    <RegisterForm>
      <Logo>
        <h1>LOGO</h1>
      </Logo>

      <form onSubmit={onSubmitRegister}>
        <InputField
          type="email"
          name="email"
          placeholder={data.email}
          value={email}
          onInput={handleInput}
          errorState={validationMsg.email !== '' && validationMsg.email !== undefined  ? true : false}
          errorText={validationMsg.email}
          setError={setValidationMsg}
        />

        <InputField
          type="text"
          name="username"
          placeholder={data.username}
          value={username}
          onInput={handleInput}
          errorState={validationMsg.username !== '' && validationMsg.username !== undefined ? true : false}
          errorText={validationMsg.username}
          setError={setValidationMsg}
        />

        <InputField
          type="password"
          name="password"
          placeholder={data.password}
          value={password}
          onInput={handleInput}
          errorState={validationMsg.password !== '' && validationMsg.password !== undefined ? true : false}
          errorText={validationMsg.password}
          setError={setValidationMsg}
        />

        <InputField
          type="password"
          name="passwordConfirm"
          placeholder={data.passwordConfirm}
          value={passwordConfirm}
          onInput={handleInput}
          errorState={validationMsg.passwordConfirm !== '' && validationMsg.passwordConfirm !== undefined ? true : false}
          errorText={validationMsg.passwordConfirm}
          setError={setValidationMsg}
        />

        <Action>
          <Button title={data.button1} active={true} width="250px" />
        </Action>
      </form>
      <Action>
        <Button
          title={data.button2}
          normal={true}
          width="250px"
          onClick={toggleForm}
        />
      </Action>
    </RegisterForm>
  )
}

const data = {
  email: 'Email Address',
  password: 'Your password',
  username: 'Your username',
  passwordConfirm: 'Confirm your password',
  button1: 'Next',
  button2: 'Already have account',
}

export default Register

const Logo = styled.div``

const RegisterForm = styled.div`
  width: 50%;
  max-width: 410px;
  padding: 40px 40px 10px 40px;
`

const Action = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
