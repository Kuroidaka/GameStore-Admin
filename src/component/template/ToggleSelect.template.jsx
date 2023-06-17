
import React, { useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import styled from "styled-components/macro";

export default function ToggleSelect(props) {
    const { data:justifyOptions, defaultValueIndex, value, setValue } = props

    // const [value, setValue] = useState(justifyOptions[defaultValueIndex]);


    return (
        <SelectButton className="py-3" value={value || justifyOptions[defaultValueIndex]} onChange={(e) => setValue(e.value)} optionLabel="name" options={justifyOptions} />
    );
}
