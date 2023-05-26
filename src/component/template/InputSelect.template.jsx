import React from 'react';
import styled from 'styled-components';



// InputBox component
const InputBox = (props) => {
  const { optionList, onChange } = props

  return (
    <InputBoxContainerWrapper>
    
    </InputBoxContainerWrapper>
  );
};

const InputBoxContainerWrapper = styled.div` 
  position: relative;
  width: 125px;
  height: 30px;
  border-radius: 10px;
  border : 1px solid var(--border-color);

`

const InputBoxContainer = styled.select`
  width: 100%;
  height: 100%;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;




export default InputBox;
