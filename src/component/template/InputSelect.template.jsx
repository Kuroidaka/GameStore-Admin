
import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import styled from "styled-components/macro";

const InputSelect = (props) => {

    const { title, width, data, className, currentValue, name } = props

    const [selected, setSelected] = useState(currentValue);

    useEffect(() => {
        setSelected(currentValue)
    }, [currentValue]);

    console.log("currentValue", selected)

    return (
    <Container width={width} className={className}>
            <div className="text-wrapper flex flex-column gap-2 py-2 text-2xl">
                <label htmlFor={title} className="text-xl font-semibold">{title ?? ''}</label>
                <Dropdown aria-describedby={name} inputId={title} placeholder={selected} value={selected} onChange={(e) => setSelected(e.value)} options={data} optionLabel="name"  />
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
