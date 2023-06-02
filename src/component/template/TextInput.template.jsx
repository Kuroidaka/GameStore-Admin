import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import styled from "styled-components/macro";

const  TextInputTemplate = (props) => {

    const { value, onInput, label } = props

    const [text, setText] = useState(value);

    const handleInput = (e) => {
        onInput()
        setText(e.target.value)
    }

    return (
        <Container>
            <div className="flex flex-column gap-2 py-2 text-2xl">
                <label htmlFor="username" className="text-xl font-semibold">{label ?? ''}</label>
                <InputText id="username" name={label} aria-describedby="username-help" value={text} onInput={handleInput} />
            </div>
        </Container>
    )
}

export default TextInputTemplate


const Container = styled.div`

.p-inputtext {
    font-size: 1.4rem!important;
}
`