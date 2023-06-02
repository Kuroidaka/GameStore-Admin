
import React, { useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import styled from "styled-components/macro";

export default function ToggleSelect(props) {
    const { data:justifyOptions, defaultValueIndex } = props

    const [value, setValue] = useState(justifyOptions[defaultValueIndex]);

    const justifyTemplate = (option) => {
        return <i className={option.icon}></i>;
    }

    console.log("value",defaultValueIndex)

    return (
        <SelectButton className="py-3" value={value} onChange={(e) => setValue(e.value)} optionLabel="name" options={justifyOptions} />
    );
}
