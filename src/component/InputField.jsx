import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { icon } from '~/assert/icon/icon'


/*
============================================================================================================
USE CASE:
============================================================================================================
 <InputField
        //basic
            type="username"
            id="inputUsername"
            className="form-control"
            placeholder={data.username}
            value={username}
            name="username"
            onInput={handleInput}

        //validation error
            errorText={validationMsg.username}
            errorState={validationMsg.username !== '' && validationMsg.username !== undefined ? true : false}
            setError={setValidationMsg}
          />
============================================================================================================     
*/


const InputField = (props) => {
  const { 
    type="text",
    name,
    placeholder,
    value,
    onInput,
    required,
    errorText,
    errorState = false,
    setError
   } = props

   const [typeInput, setType] = useState({
        currentType: type,
        origin: type,
        hide: true
    })
    const [state, setState] = useState({
      error: false,
      msg: ''
    })


    useEffect(() => { 
      setState({error: errorState, msg: errorText})
    }, [errorState, errorText]);

   const handleClickEye = () => {
        const {currentType, origin} = typeInput

        if(currentType === origin && origin === "password") {
            setType((prev) => {
                return {...prev, currentType:'text', hide: false}
            })
        }
        else {
            setType((prev) => {
                return {...prev, currentType:origin, hide: true}
            })
        }
   }

   const handleInputValue = (e) => {
      setState({error: false, msg: ''})
      setError({[e.target.getAttribute('name')]: ''})
      onInput(e)

   }

  return (
    <Container className="input_bar-box" state={state}>
      <div className={`input_bar-wrapper ${state.error && 'error'}`}>
        <input
          type={typeInput.currentType}
          autoComplete="new-password"
          className="input_bar"
          name={name}
          onInput={handleInputValue}
          value={value}
          placeholder=" "
          required={required}
        />
        <h5 className="input_bar-placeholder">{placeholder}</h5>
        {
            type === "password" && 
            <div className="icon" onClick={handleClickEye}>
            {typeInput.hide ?
                <icon.passUnHide/>: <icon.passHide/>
            }
            </div>
        }
      </div>
      <div className={`notify ${ state.error && 'show'}`}>{errorText}</div>
    </Container>
  )
}

export default InputField

const Container = styled.div`
  --input-height: 45px;

  margin: 20px 0;
  width: 100%;
  position: relative;

  .input_bar-wrapper {
    width: 100%;
    height: var(--input-height);
    border-bottom: 1px solid #e3e3e3;
    position: relative;
    display: flex;

    .input_bar {
      height: 100%;
      /* top: 0; */
      /* position: relative; */
      width: 100%;
      border: none;
      outline: none;
      border-radius: 10px;
      align-self: flex-end;
      font-size: 15px;
      padding: 10px;
      padding-top: 20px;
      background-color: transparent;
      z-index: 2;

      &:focus ~ .input_bar-placeholder {
        font-size: 12px;
        transform: translateY(0);
        top: 1px;
      }

      
    }

    .input_bar-placeholder {
      position: absolute;
      top: calc(var(--input-height) / 2);
      transform: translateY(-50%);
      left: 10px;
      font-weight: 100;
      color: var(--text-color);
      background-color: transparent;
      font-size: 15px;
      transition: all linear 0.1s;
      line-height: 1;
      font-weight: 500;
      z-index: 1;
    }

    .icon {
        margin: 10px 0 0 10px;
        align-self: center;
        cursor: pointer;
        
        svg {
            font-size: 25px;
        }
    }

    & > input:not(:placeholder-shown) ~ .input_bar-placeholder {
      font-size: 12px;
      transform: translateY(0);
      top: 1px;
    }

    &.error {
        border-bottom: 1px solid red;

        .input_bar-placeholder {
            color: red;
        }
    }
  }

  .notify{
    color: red;
    position: absolute;
    z-index: -1;
    font-size: 0ch;
    transition: all linear .2s;
    &.show {
        bottom: -20px;
        left: 10px;
        font-size: 11px;
    }
  }
`
