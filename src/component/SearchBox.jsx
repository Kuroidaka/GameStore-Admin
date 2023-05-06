import React from 'react';
import styled from 'styled-components';
import { icon } from '~/assert/icon/icon'

const SearchBox = () => {
  return (
    <SearchContainer>
      <SearchInput type="text" placeholder="Search" />
      <SearchIcon>
        <icon.search />
      </SearchIcon>
    </SearchContainer>
  );
};

export default SearchBox;

const SearchContainer = styled.div`
  position: relative;
  width: 20%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px 8px 40px;
  border: none;
  border-radius: 24px;
  background-color: #f0f0f0;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 150px;
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 20px;
  color: #555;
`;
