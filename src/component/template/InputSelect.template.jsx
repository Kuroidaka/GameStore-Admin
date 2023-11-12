
import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import styled from "styled-components/macro";

const InputSelect = (props) => {

    const { title, width, data, className, value, name, onInput } = props

    const [selected, setSelected] = useState(value);

    useEffect(() => {
        setSelected(value)
    }, [value]);

    const handleInput = (e) => { 
        onInput && onInput(e, "gender")
        console.log(e.target.value.name)
        setSelected(e.target.value.name)
    }

    return (
    <Container width={width} className={className}>
            <div className="text-wrapper flex flex-column gap-2 py-2 text-2xl">
                <label htmlFor={title} className="text-xl font-semibold">{title ?? ''}</label>
                <Dropdown aria-describedby={name} inputId={title} placeholder={selected} value={selected} onChange={handleInput} options={data} optionLabel="name" />
            </div>
    </Container>    
    )
}
        
export default InputSelect

const Container = styled.div `
width: ${({width}) => width ? width : '150px'};

.p-dropdown {
    width: 100%!important;
}
`
