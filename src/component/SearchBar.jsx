import React from "react";
import styled from "styled-components/macro";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <SearchIcon />
      <SearchInput type="text" placeholder="Search Product" />
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1; /* Added */
  max-width: 400px; /* Added */
  height: 4rem;
  background-color: #f5f5f5;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  margin-right: 1rem; /* Updated */
`;

const SearchIcon = styled(FaSearch)`
  color: #666666;
  font-size: 2rem;
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  margin-left: 1rem;
  font-size: 1.5rem;
  flex: 1;
  &::placeholder {
    color: #999999;
    font-style: italic;
  }
`;
