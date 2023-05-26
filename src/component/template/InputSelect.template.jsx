import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { icon } from '~/assert/icon/icon'

// InputBox component
const InputBox = (props) => {
  const { options, onChange, width, height, title } = props;

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <InputBoxContainerWrapper width={width} height={height}>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder={title}
      />
    </InputBoxContainerWrapper>
  );
};

const InputBoxContainerWrapper = styled.div`
  position: relative;
  width: ${({ width }) => (width ? `${width}` : `200px`)};
  border-radius: 10px;
`;


export default InputBox;
