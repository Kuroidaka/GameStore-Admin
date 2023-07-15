import React, { useEffect, useState } from "react";
import { Password } from 'primereact/password';
import styled from "styled-components/macro";

const  PasswordTemplate = (props) => {

    const { value, onInput, label, className, name } = props

    const [text, setText] = useState(value);

    const handleInput = (e) => {
        onInput && onInput(e)
        setText(e.target.value)
    }

    useEffect(() => {
        setText(value)
    }, [value]);



    return (
        <Container className={className}>
            <div className="text-wrapper flex flex-column gap-2 py-2 text-2xl">
                <label htmlFor={name} className="text-xl font-semibold">{label ?? ''}</label>
                
                <Password id={name} aria-describedby={name} name={name} className="h-full" value={text} onInput={handleInput} toggleMask/>
            </div>
        </Container>
    )
}

export default PasswordTemplate


const Container = styled.div`

.p-inputtext {
    font-size: 1.4rem!important;
}

.text-wrapper .p-password .p-password-input {
    width: 100%!important;

    i {
        top: 38%!important;
    }
}


`