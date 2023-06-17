import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import styled from "styled-components/macro";

const  TextInputTemplate = (props) => {

    const { value, onInput, label, className, textarea, name } = props

    const [text, setText] = useState(value);

    const handleInput = (e) => {
        onInput && onInput(e)
        setText(e.target.value)
    }

    useEffect(() => {
        setText(value)
    }, [value]);

    const Input = textarea ? InputTextarea : InputText

    return (
        <Container className={className}>
            <div className="flex flex-column gap-2 py-2 text-2xl">
                <label htmlFor={name} className="text-xl font-semibold">{label ?? ''}</label>
                <Input id={name} aria-describedby={name} name={name} value={text} onInput={handleInput} />
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