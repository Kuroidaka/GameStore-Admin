import React, { Fragment } from 'react';
import { Select } from 'antd';

interface SelectInputPropType {
    width: string | unknown
    setValue: React.Dispatch<React.SetStateAction<string>> 
    value?:  {
        label: string;
        value: string;
    }[]
    label:string
    id: string
}



const SelectInput = (props:SelectInputPropType) => {
    const { width, value, setValue, label, id } = props


    const handleChange = (value: string) => {
      setValue(value)
    };

    return (
    <Fragment>
      <label htmlFor={id} className='label'>{label}</label>
      <Select
        id={id}
        defaultValue={value && value[0].value}
        style={{ width: `${width}`}}
        onChange={handleChange}
        options={[
          {
            label: `${label}`,
            options: value,
          }
        ]}
      />
    </Fragment>
    )
}

export default SelectInput;