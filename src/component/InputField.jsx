import { useState } from 'react'
import styled from 'styled-components'
import { icon } from '~/assert/icon/icon'

const InputField = (props) => {
  const { 
    type="text",
    name,
    placeholder,
    value,
    onChange,
    required

   } = props

   const [typeInput, setType] = useState({
        currentType: type,
        origin: type,
        hide: true
    })

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

  return (
    <Container className="input_bar-box">
      <div className="input_bar-wrapper">
        <input
          type={typeInput.currentType}
          autoComplete="new-password"
          className="input_bar"
          name={name}
          onChange={onChange}
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
    </Container>
  )
}

export default InputField

const Container = styled.div`
  --input-height: 45px;

  margin: 20px 0;
  width: 100%;

  .input_bar-wrapper {
    width: 100%;
    height: var(--input-height);
    background-color: transparent;
    border-bottom: 1px solid grey;
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
      z-index: -1;
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


  }
`
