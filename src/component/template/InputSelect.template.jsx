
import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import styled from "styled-components/macro";

const InputSelect = (props) => {

    const { title, width, data } = props

    const [selected, setSelected] = useState(null);


    return (
    <Container width={width}>
       <span className="p-float-label">
            <Dropdown inputId="dd" value={selected} onChange={(e) => setSelected(e.value)} options={data} optionLabel="name"  />
            <label htmlFor="dd">{title}</label>
        </span>
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
